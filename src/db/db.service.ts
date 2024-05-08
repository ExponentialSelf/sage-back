import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedProductPayload, IProduct, IUser } from './dto';
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
    try {
      const data = payload.data
      console.log(data)
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
    const response = await this.prisma.worker.findFirstOrThrow(
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
      const date = (new Date()).toString()
      const tokenization = jwt.sign(date, Secret.JWT_TOKEN, { algorithm: 'HS256' })
      res.token = tokenization
      const token = await this.prisma.token.upsert({
       create: {
        token: tokenization,
        workerId: Number(response.id)
       },
       update: {
        token: tokenization
       },
       where: {
        id: Number(response.id)
       }
      })
      console.log({token})
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
}
