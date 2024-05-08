import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { DbService } from './db.service';
import { AuthenticatedProductPayload, IProduct, IUser } from './dto';


@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}
  @Post('/products/handler')
  create(@Body() payload :AuthenticatedProductPayload)
  {
   console.log('Commencing product creation')
   console.log('Payload:', payload)
   if (!payload.data) {
    throw new HttpException("Data was missing or malformed", HttpStatus.UNPROCESSABLE_ENTITY)
  }
  if (!payload.token) {
    throw new HttpException("Token was missing", HttpStatus.UNPROCESSABLE_ENTITY)
  }
  if  (typeof payload.data.quantity != "number") {
    throw new HttpException(`Quantity should be a Number (currently: ${typeof payload.data.quantity})`, HttpStatus.UNPROCESSABLE_ENTITY)
  } 
    return this.dbService.createProduct(payload)
  }

  @Delete('/products/handler')
  delete(@Body() payload :AuthenticatedProductPayload)
  {
    console.log('Payload:', payload)
    console.log('Commencing product deletion')
    if (!payload.data) {
      throw new HttpException("Data was missing or malformed", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    if (!payload.token) {
      throw new HttpException("Token was missing", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    if  (typeof payload.data.quantity != "number") {
      throw new HttpException(`Quantity should be a Number (currently: ${typeof payload.data.quantity})`, HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return this.dbService.deleteProduct(payload)
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
