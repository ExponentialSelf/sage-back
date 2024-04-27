import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct } from './dto';

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
}
