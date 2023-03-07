import { DbExistsOptionalValidation } from "./DbExistsOptional.validation";
import { DbExistsValidation } from "./DbExists.validation";
import { ParseJsonValidation } from "./ParseJson.validation";
import { DbExistsAllValidation } from "./DbExistsAll.validation";

export const Validations = [
  DbExistsValidation,
  DbExistsOptionalValidation,
  ParseJsonValidation,
  DbExistsAllValidation
]