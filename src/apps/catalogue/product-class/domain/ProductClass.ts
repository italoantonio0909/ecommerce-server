import { Option } from '../../option/domain/Options';

export class ProductClass {
  readonly name: string
  readonly required_shipping: string
  readonly track_stock: boolean
  readonly options: Array<Option>
  readonly created_at?: number
  readonly modified_at?: number
}

export type ProductClassPaginate = {
  limit: number,
  count: number,
  next: number,
  previous: number,
  results: Array<ProductClass>
}