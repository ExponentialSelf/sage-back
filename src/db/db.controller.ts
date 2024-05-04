import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { DbService } from './db.service';
import { IProduct, IUser } from './dto';


@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}
  @Post('/products/create')
  create(@Body() payload :IProduct)
  {
    console.log(payload)
    return this.dbService.createProduct(payload)
  }

  @Get('/products/getAll')
  getAll(@Query('take') take?: string, @Query('skip') skip?: string,
  ) {
    
    return this.dbService.getAll(take,skip)
  }

  @Post('/users/verify')
  @HttpCode(200)
  verifyUser(@Body() payload: IUser)
  {
    return this.dbService.verifyUser(payload)
  }
}
