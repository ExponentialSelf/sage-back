import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DbService } from './db.service';
import { IProduct } from './dto';


@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}
  @Get('/create/product/:id')
  create(@Param('id') unique_id: string,
        @Query('receiver') receiver: string,
        @Query('quantity') quantity: number,
        @Query('reference') reference: string,
        @Query('model') model: string,
        @Query('gate') gate: string,
        @Query('supplier_code') supplier_code: string
  ) {
    if (!unique_id) {
      return {
        error: 'unique_id is required'
      }
    }
    if (!quantity) {
      return {
        error: 'quantity is required'
      }
    }
    if (!reference) {
      return {
        error: 'reference is required'
      }
    }
    if (!model) {
      return {
        error: 'model is required'
      }
    }
    if (!gate) {
      return {
        error: 'gate is required'
      }
    }

    if (!supplier_code) {
      return {
        error: 'supplier_code is required'
      }
    }
    
    const payload:IProduct = {
      unique_id,
      receiver,
      quantity:Number(quantity),
      reference,
      model,
      gate,
      supplier_code
    }
    return this.dbService.createProduct(payload)
  }
}
