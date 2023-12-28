export default {
  VALIDATION_ERROR: 'Validation error',
  // user fields validation
  USER_NAME_STRING_MSG: 'User name must be a string',
  USER_NAME_MIN_LENGTH_MSG:
    'User name must be at least $constraint1 characters',

  USER_EMAIL_MSG: 'User e-mail must be in the correct format',
  USER_EMAIL_EMPTY_MSG: 'User e-mail must be not empty',

  USER_PASSWORD_EMPTY_MSG: 'User password must be not empty',
  USER_PASSWORD_STRING_MSG: 'User password must be a string',
  USER_PASSWORD_LENGTH_MSG:
    'User password must be between $constraint1 and $constraint2 characters',

  // products fields validation
  PRODUCT_TITLE_EMPTY_MSG: 'Products title must be not empty',
  PRODUCT_TITLE_STRING_MSG: 'Products title must be a string',
  PRODUCT_TITLE_MIN_LENGTH_MSG:
    'Products title must be between $constraint1 characters',

  PRODUCT_DESCRIPTION_STRING_MSG: 'Products description must be a string',

  PRODUCT_PRICE_EMPTY_MSG: 'Products price must be not empty',
  PRODUCT_PRICE_NUMBER_MSG: 'Products price must be a number',

  // category fields validation
  CATEGORY_TITLE_EMPTY_MSG: 'Category title must be not empty',
  CATEGORY_TITLE_STRING_MSG: 'Category title must be a string',
  CATEGORY_TITLE_LENGTH_MSG:
    'Category title must be between $constraint1 and $constraint2 characters',
};
