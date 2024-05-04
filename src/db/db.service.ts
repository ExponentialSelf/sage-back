import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct, IUser } from './dto';
import * as jwt from 'jsonwebtoken'
import { Secret } from 'src/secrets';

@Injectable()
export class DbService {
  constructor(private readonly prisma: PrismaService) { }
  
  createProduct(payload:IProduct) {
    const result = this.prisma.product.create(
        {
          data: payload
        }
      )
    return result
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
      ok:false
    }
    const encrypted_pass = jwt.sign(payload.password,Secret.JWT_TOKEN, { algorithm: 'HS256' });
    console.log(encrypted_pass);
    const response = await this.prisma.worker.findFirstOrThrow(
      {
        where: {
          password: encrypted_pass,
          AND: {
            name: payload.username
          }
        }
      }
    ).then((response) => {
      res.message = "Login successful";
      res.ok = true;
    })
    .catch((err) => {
      res.message = "Login unsuccessful"
      res.ok = false;
      throw new HttpException(res, HttpStatus.NOT_FOUND)
    })
    throw new HttpException(res, HttpStatus.FOUND)
    return res;
  }
}
