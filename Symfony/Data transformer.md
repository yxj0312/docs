Symfony Form Data Transformers are used to transform data between the form and the underlying model. They are particularly useful when the data stored in your model doesn't match the data expected by the form field. Let's illustrate the concept of Data Transformers in Symfony forms with a real-world online shop example.

### Real-World Online Shop Example:

Consider a scenario where your online shop application uses a Product entity with a `price` property stored as an integer (cents) in the database, but you want to display and edit the price as a decimal in your forms.

1. **Product Entity:**
   ```php
   // src/Entity/Product.php
   namespace App\Entity;

   class Product
   {
       private $name;
       private $price; // Price stored as cents

       // Getters and setters for properties
   }
   ```

2. **ProductType:**
   ```php
   // src/Form/ProductType.php
   namespace App\Form;

   use Symfony\Component\Form\AbstractType;
   use Symfony\Component\Form\Extension\Core\Type\MoneyType;
   use Symfony\Component\Form\FormBuilderInterface;
   use Symfony\Component\OptionsResolver\OptionsResolver;

   class ProductType extends AbstractType
   {
       public function buildForm(FormBuilderInterface $builder, array $options)
       {
           $builder
               ->add('name')
               ->add('price', MoneyType::class, [
                   'currency' => false, // Disabling the currency field
                   'divisor' => 100, // Transforming between cents and dollars
               ]);
       }

       // ...
   }
   ```

3. **PriceTransformer:**
   ```php
   // src/Form/DataTransformer/PriceTransformer.php
   namespace App\Form\DataTransformer;

   use Symfony\Component\Form\DataTransformerInterface;
   use Symfony\Component\Form\Exception\TransformationFailedException;

   class PriceTransformer implements DataTransformerInterface
   {
       public function transform($value)
       {
           // Transforming cents to dollars for displaying in the form
           return $value / 100;
       }

       public function reverseTransform($value)
       {
           // Transforming dollars to cents for storing in the database
           if (!is_numeric($value)) {
               throw new TransformationFailedException('Expected a numeric value.');
           }

           return (int)($value * 100);
       }
   }
   ```

4. **ProductController:**
   ```php
   // src/Controller/ProductController.php
   namespace App\Controller;

   use App\Entity\Product;
   use App\Form\ProductType;
   use App\Form\DataTransformer\PriceTransformer;
   use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
   use Symfony\Component\HttpFoundation\Request;
   use Symfony\Component\HttpFoundation\Response;
   use Symfony\Component\Routing\Annotation\Route;

   class ProductController extends AbstractController
   {
       #[Route('/product/new', name: 'new_product')]
       public function new(Request $request, PriceTransformer $priceTransformer): Response
       {
           $product = new Product();
           $form = $this->createForm(ProductType::class, $product);

           // Applying the PriceTransformer to the price field
           $form->get('price')->addModelTransformer($priceTransformer);

           $form->handleRequest($request);

           if ($form->isSubmitted() && $form->isValid()) {
               // Save the product to the database or perform any other necessary action
               // ...

               return $this->redirectToRoute('product_list');
           }

           return $this->render('product/new.html.twig', [
               'form' => $form->createView(),
           ]);
       }
   }
   ```

In this example:
- The `ProductType` form type uses the `MoneyType` field for the `price` property.
- The `PriceTransformer` transforms the price between cents (stored in the database) and dollars (displayed in the form).
- The `ProductController` injects the `PriceTransformer` and applies it to the `price` field.

This ensures that the data entered in the form is correctly transformed before being stored in the database and vice versa. Data transformers are a powerful tool for handling data conversions in Symfony forms.
