import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.type'

@Pipe({
  name: 'chickenProducts'
})
export class ChickenProductsPipe implements PipeTransform {

  transform(products: Product[]): Product[] {
    return products.filter(product=>{
      return product.title.toLowerCase().includes('кур')
    });
  }

}
