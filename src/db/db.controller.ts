import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpException, HttpStatus, Put } from '@nestjs/common';
import { DbService } from './db.service';
import { AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserSearchPayload, IProduct, IProductSearch, IUser, IUserSearch } from './dto';


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
  const token = this.dbService.checkToken(payload.token)
  if (!token) {
    throw new HttpException("Token was invalid", HttpStatus.UNPROCESSABLE_ENTITY)
  }
  const productStatus = ['IN_STOCK','NO_LONGER_IN_STOCK']
  if (!productStatus.includes(payload?.data?.status)) {
    throw new HttpException("Product status selected does not exist", HttpStatus.BAD_REQUEST)
  }
    return this.dbService.createProduct(payload)
  }

  @Put('/products/handler')
  put(@Body() payload :AuthenticatedProductPayload)
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
  const token = this.dbService.checkToken(payload.token)
  if (!token) {
    throw new HttpException("Token was invalid", HttpStatus.UNPROCESSABLE_ENTITY)
  }
  const productStatus = ['IN_STOCK','NO_LONGER_IN_STOCK']
  if (!productStatus.includes(payload?.data?.status)) {
    throw new HttpException("Product status selected does not exist", HttpStatus.BAD_REQUEST)
  }
    return this.dbService.updateProduct(payload)
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
    const token = this.dbService.checkToken(payload.token)
    if (!token) {
      throw new HttpException("Token was invalid", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return this.dbService.deleteProduct(payload)
  }

  @Get('/products/getAll')
  getAll(@Query('take') take?: string, @Query('skip') skip?: string,
  ) {
    
    return this.dbService.getAll(take,skip)
  }

  @Post('/products/search')
  @HttpCode(200)
  searchProducts(@Body() payload: AuthenticatedProductSearchPayload)
  {
    if (!payload.token) {
      throw new HttpException("Token was missing", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const token = this.dbService.checkToken(payload.token)
    if (!token) {
      throw new HttpException("Token was invalid", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return this.dbService.searchProducts(payload)
  }

  /* Users */

  @Post('/users/verify')
  @HttpCode(200)
  verifyUser(@Body() payload: IUser)
  {
    return this.dbService.verifyUser(payload)
  }

  @Post('/users/create')
  @HttpCode(201)
  createUser(@Body() payload: IUser)
  {
    const roles = ['ADMIN','WORKER']
    if (!roles.includes(payload?.role)) {
      throw new HttpException("Role selected does not exist", HttpStatus.BAD_REQUEST)
    }
    return this.dbService.createUser(payload)
  }

  @Get('/users/getAll')
  @HttpCode(200)
  getAllUsers(@Query('take') take?: number, @Query('skip') skip?: number, @Query('role') role?: string) {
    return this.dbService.getAllUsers(take,skip,role)
  }

  @Post('/users/search')
  @HttpCode(200)
  searchUsers(@Body() payload: AuthenticatedUserSearchPayload) {
    if (!payload.token) {
      throw new HttpException("Token was missing", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const token = this.dbService.checkToken(payload.token)
    if (!token) {
      throw new HttpException("Token was invalid", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return this.dbService.searchUsers(payload)
  }

}
