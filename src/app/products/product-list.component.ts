import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    _listFilter: string;
    errorMessage: any;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
        console.log('In Constructor')
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('In OnInit');
        this.productService.getProducts().subscribe(
            products => this.products = products,
            error => this.errorMessage = <any>error,
            () => this.filteredProducts = this.products
            );
        ;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(
            (product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    
    onRatingClicked(message: string): void {
        this.pageTitle = message;
    }
}