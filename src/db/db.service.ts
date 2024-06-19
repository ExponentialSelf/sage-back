import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedAnomlyPayload, AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserPayload, AuthenticatedUserSearchPayload, IProduct, IProductSearch, IUser, IUserAdvanced, IUserSearch, ProductStatus } from './dto';
import * as jwt from 'jsonwebtoken'
import { Secret } from 'src/secrets';

@Injectable()
export class DbService {
  constructor(private readonly prisma: PrismaService) { }
  
  async createProduct(payload: AuthenticatedProductPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role == "CONTROLLER") {
      if (payload.data.status != "ANOMLY" && payload.data.status != "INSPECTED") {
        console.log(`CONTROLLERS are only allowed to change status to "INSPECTED" or "ANOMLY"`)
        res.message = "Request sent is malformed, contact an admin (Wrong Status)"
        throw new HttpException(res, HttpStatus.BAD_REQUEST)
      }
    }
    if (token.role == "WORKER") {
      console.log(`WORKERS are not allowed to create products`)
      res.message = "Request sent is malformed, contact an admin (user cannot create product)"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    if (payload?.data?.anomlyId != null && payload.data.status != "ANOMLY") {
      console.log(`There is an anomly ID but the status is not "ANOMLY"`)
      res.message = "Request sent is malformed, contact an admin (Anomly selected but the status is not an ANOMLY)"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    if (payload.data.anomlyId != null) {
      const anomlies = (await this.prisma.anomly.findMany())
      const anomly = anomlies.filter((anomly => anomly.id == payload.data.anomlyId))
      if (anomly.length == 0) {
        console.log('Request sent is malformed, contact an admin')
        res.message = "Request sent is malformed, contact an admin. (Anomly chosen is not found in the database)"
        throw new HttpException(res, HttpStatus.BAD_REQUEST)
      }
    }
    try {
      console.log(payload.data)
      const result = await this.prisma.product.create(
          {
            data: payload.data
            
          }
        )
      res.result = result
      res.message = "Product created"
      return res
    } catch (err) {
      res.message = "Product already exists"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  }

  async updateProduct(payload: AuthenticatedProductPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role == "WORKER") {
      if (payload.data.status != "IN_STOCK" && payload.data.status != "SHIPPED") {
        console.log(`users are only authorized to update products to "IN_STOCK" or "SHIPPED" (user ID: ${token.workerId})`)
        res.message = "Request sent is malformed, contact an admin (Wrong Status)"
        throw new HttpException(res, HttpStatus.BAD_REQUEST)
      }
      const product = await this.prisma.product.findFirst(
        {
          where: {
            unique_id: payload.data.unique_id
          }
        }
      )
      if (product.status != "INSPECTED" && product.status != "IN_STOCK") {
        console.log(`user ${token.workerId}: This product has another status instead of "INSPECTED" or "IN_STOCK" `) 
        res.message = "Request sent is malformed, contact an admin (Product status is not inspected)"
        throw new HttpException(res, HttpStatus.BAD_REQUEST)
      }
    }
    try {
      const result = await this.prisma.product.update(
          {
            data: payload.data,
            where: {
              unique_id: payload?.data?.unique_id
            }
          }
        )
      console.log({result})
      res.result = result
      res.message = "Product updated"
      return res
    } catch (err) {
      console.log(err)
      res.message = "There was an issue updating the product"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteProduct(payload: AuthenticatedProductPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    try {
      const result = await this.prisma.product.delete(
        {
          where: {
            unique_id: payload.data.unique_id
          }
        }
      )
      console.log(result)
      console.log(Object.values(result).length == 0)
    res.result = result
    res.message = "Product found"
    return res
    } catch (err) {
      res.message = "Product not found"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  
  }

  async searchProducts(payload: AuthenticatedProductSearchPayload) {
    let res = {
      message: "",
      ok: false,
      data: undefined
    };

    try {
      const response = await this.prisma.product.findMany({
        where: payload.data
      })
      res.ok = true
      res.message = "Products fetched successfully"
      if (response.length < 1) {
        res.message = "No products found"
      }
      
      res.data = response
    } catch(err) {
      res.message = "Error while fetching users";
      res.ok = false;
      console.log({res, err})
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
    console.log(res)
    return res
  }

  getAll(take?: string,skip?: string) {
    return this.prisma.product.findMany(
      {
        skip: Number(skip),
        take: Number(take),
        orderBy: {
          model: 'asc'
        }
      }
    )
  }

  async verifyUser(payload:IUser) {
    
    let res = {
      message: "",
      ok:false,
      token: ""
    }
    const encrypted_pass = jwt.sign(payload.password,Secret.JWT_TOKEN, { algorithm: 'HS256' });
    console.log(encrypted_pass);
    console.log(payload)
    const response = await this.prisma.user.findFirstOrThrow(
      {
        where: {
          password: encrypted_pass,
          AND: {
            name: payload.username
          }
        }
      }
    ).then(async (response) => {
      res.message = "Login successful";
      res.ok = true;
      res.token = await this.createToken(response)
      res["role"] = response.role
      return res
    })
    .catch((err) => {
      console.log(err)
      res.message = "Login unsuccessful"
      res.ok = false;
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    })
    console.log(response)
    return response;
  }


  async createUser(payload:AuthenticatedUserPayload){
    let res = {
      message: "",
      ok:false
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    console.log(payload)
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role != "ADMIN") {
      console.log(`ONLY ADMINS CAN CREATE OTHER USERS`)
      res.message = "Request sent is malformed, contact an admin (Permission denied (NOT ADMIN))"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    const encrypted_pass = jwt.sign(payload.data.password,Secret.JWT_TOKEN, { algorithm: 'HS256' });
    try {
      const response = await this.prisma.user.create(
        {
          data: {
              name: payload.data.username,
              password: encrypted_pass,
              role: payload.data.role
          }
        }
      )
      console.log(response)
      res.message = "User created successfully";
      res.ok = true;
    } catch(err) {
      console.log(err)
      res.message = "User already exists"
      res.ok = false;
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    return res;
  }

  async getAllUsers(take,skip = 0,role) {
    let res = {
      message: "",
      ok: false,
      data: undefined
    };

    let prisma_config = {
      skip,
      take,
      where: {}
    }
    if (role) {
      prisma_config.where = {
        role: role
      }; 
    }

    try {
      const response = await this.prisma.user.findMany(prisma_config)
      res.ok = true
      res.message = "Users fetched successfully"
      if (response.length < 1) {
        res.message = "No users found"
      }
      res.data = response
    } catch(err) {
      res.message = "Error while fetching users";
      res.ok = false;
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
    return res
  }

  async searchUsers(payload: AuthenticatedUserSearchPayload) {
    let res = {
      message: "",
      ok: false,
      data: undefined
    };

    try {
      const response = await this.prisma.user.findMany({
        where: payload.data,
        select: {
          name: true,
          role: true,
          createdAt: true,
        }
      })
      res.ok = true
      res.message = "Users fetched successfully"
      if (response.length < 1) {
        res.message = "No users found"
      }
      res.data = response
    } catch(err) {
      res.message = "Error while fetching users";
      res.ok = false;
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
    return res
  }

  async getAnomlies() {
    let res = {
      message: "",
      ok: false,
      data: undefined
    };
    try {
      const anomlies = await this.prisma.anomly.findMany()
      res.message = "Anomlies fetched sucessfully"
      if (anomlies.length == 0) {
        res.message = "No anomlies definitions found"
      }
      res.data = anomlies
      res.ok = true
    } catch (err) {
      res.message = "Error while fetching anomlies";
      res.ok = false;
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
    return res
  }

  async createAnomly(payload: AuthenticatedAnomlyPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role != "ADMIN") {
      console.log(`ONLY ADMINS CAN CREATE ANOMLIES DEFINITIONS`)
      res.message = "Request sent is malformed, contact an admin (Permission denied (NOT ADMIN))"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    try {
      const result = await this.prisma.anomly.create(
          {
            data: payload.data
          }
        )
      res.result = result
      res.message = "Anomly created"
      return res
    } catch (err) {
      res.message = "Anomly already exists"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  }

  async updateAnomly(payload: AuthenticatedAnomlyPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role != "ADMIN") {
      console.log(`ONLY ADMINS CAN CREATE ANOMLIES DEFINITIONS`)
      res.message = "Request sent is malformed, contact an admin (Permission denied (NOT ADMIN))"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    try {
      const result = await this.prisma.anomly.update(
          {
            data: payload.data,
            where: {
              id: payload?.data?.id
            }
          }
        )
      console.log({result})
      res.result = result
      res.message = "Anomly updated"
      return res
    } catch (err) {
      console.log(err)
      res.message = "There was an issue updating the Anomly"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteAnomly(payload: AuthenticatedAnomlyPayload) {
    const res = {
      message: "",
      payload: payload,
      result: undefined
    }
    const token = await this.prisma.token.findFirst({
      where: {
        token: payload.token
      }
    })
    if (!token) {
      res.message = "Token is invalid"
      throw new HttpException(res, HttpStatus.UNAUTHORIZED)
    }
    if (token.role != "ADMIN") {
      console.log(`ONLY ADMINS CAN CREATE ANOMLIES DEFINITIONS`)
      res.message = "Request sent is malformed, contact an admin (Permission denied (NOT ADMIN))"
      throw new HttpException(res, HttpStatus.BAD_REQUEST)
    }
    try {
      const result = await this.prisma.anomly.delete(
        {
          where: {
            id: payload.data.id
          }
        }
      )
    console.log(result)
    console.log(Object.values(result).length == 0)
    res.result = result
    res.message = "Anomly found and deleted"
    return res
    } catch (err) {
      res.message = "Anomly not found"
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
  }

  //Statistics

  async statisticsAnomlies() {
    let res = {
      message: "",
      ok: false,
      data: undefined
    };
    try {
      const products = await this.prisma.product.groupBy(
        {
          by: ['anomlyId'],
          _count: {
            unique_id: true
          },
          _sum: {
            quantity: true
          }
        }
      )
      res.message = "Statistics fetched sucessfully"
      if (products.length == 0) {
        res.message = "Statistics not found (no products?)"
      }
      res.data = products
      res.ok = true
    } catch (err) {
      res.message = "Error while fetching statistics";
      res.ok = false;
      throw new HttpException({res, err}, HttpStatus.BAD_REQUEST)
    }
    return res
  }

  async createToken(response:IUserAdvanced) {
    const date = (new Date()).toString()
        const tokenization = jwt.sign(date, Secret.JWT_TOKEN, { algorithm: 'HS256' })
        const token = await this.prisma.token.upsert({
         create: {
          token: tokenization,
          workerId: Number(response.id),
          role: response.role
         },
         update: {
          token: tokenization
         },
         where: {
          id: Number(response.id)
         }
        })
        console.log({token})
        return tokenization
  }

  async checkToken(token) {
    const response = this.prisma.token.findFirst(
      {
        where: {
          token
        }
      }
    )
    if (response) {
      return true
    }
    return false
  }
}

