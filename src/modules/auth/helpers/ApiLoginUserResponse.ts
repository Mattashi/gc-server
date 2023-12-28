import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, getSchemaPath, ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from 'helpers/ApiResponse';
import success from 'constants/successMessages';

export const ApiLoginUserResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
      description: success.USER_LOGIN_MSG,
    }),
  );
};
