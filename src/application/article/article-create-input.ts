import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ArticleCreateInput {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  body!: string;

  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(20, { each: true })
  @ArrayUnique()
  @Transform(({ value }: { value: string }) => {
    return value ? value.split(',').map(x => x.trim()) : undefined;
  })
  tagList?: string[];
}
