# Fuzzier Searching With Regular Expressions

> To finish up this chapter, let's figure out how to make our search a bit more fuzzy by combining regular expressions and virtual indices.

issue: Our users must type the search term exactly as it is or the search will not find a match. i.e "tim oreilly" will not find anything, only "tim o'reilly" can.

Normalization:

I like to normalize the search terms in a regular expression that simply removes all the non alphanumeric characters from the search term as well as from the search columns.
