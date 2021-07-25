import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    MinLength,
} from 'class-validator';

function transformEmptyString({ value }: { value: string }) {
    return value === '' ? undefined : value;
}

export class UserSettingsInput {
    @Length(3, 30)
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @MinLength(5)
    @IsNotEmpty()
    @IsOptional()
    @Transform(transformEmptyString)
    password?: string;

    @IsUrl()
    @IsOptional()
    @Transform(transformEmptyString)
    image?: string;

    @IsString()
    @IsOptional()
    @Transform(transformEmptyString)
    bio?: string;
}
