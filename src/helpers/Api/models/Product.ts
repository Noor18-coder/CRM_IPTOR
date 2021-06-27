export interface Product {
    itemId: string;
    itemDescription: string;
    parentFile: string;
    parentId: string;
    rootId: string;
    lineNumber: string;
    item: string;
    ourPrice: number;
    systemPrice: number;
    existsInItemFile: boolean;
    price: boolean;
    unit: string;
    quantity: number;
    hasNote: boolean;
    hasContact: boolean;
    hasAttribute: boolean;
}

export interface ProductParams {
    rootId : string;
  }
  
  export interface ProductResponse {
    data: {
      items: Product[]
    }
  }