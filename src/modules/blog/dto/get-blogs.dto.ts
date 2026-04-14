import { IsOptional, IsString, isString } from "class-validator";
import { PaginationQueryParams } from "../../pagination/dto/pagination.dt.js";

export class GetBLogsDTO extends PaginationQueryParams{
    @IsOptional()
    @IsString ()
    search?: string;
}