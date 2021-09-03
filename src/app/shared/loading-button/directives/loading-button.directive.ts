import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { SpinnerComponent } from '../../spinner/components/spinner/spinner.component';

@Directive( {
	selector: 'button[appLoadingButton], a[appLoadingButton]',
} )
export class LoadingButtonDirective implements OnInit, OnChanges {

	@Input() appLoadingButton = false;
	originalInnerText: string = '';

	originalInnerHTML: string = '';
	private componentRef: ComponentRef<SpinnerComponent> | null = null;


	spinner: SpinnerComponent | null = null;
	elementBtnRef: HTMLButtonElement = this.elementRef.nativeElement;
	elementBtnRefClone: HTMLButtonElement | null = null;

	constructor (
		public viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver,
		public elementRef: ElementRef,
	) {
	}


	ngOnInit (): void { }


	ngOnChanges ( changes: SimpleChanges ): void {
		if ( changes.appLoadingButton.isFirstChange() ) {
			this.backup();
		}
		this.handleLoadingState();
	}


	backup = () => {
		this.originalInnerHTML = ( this.elementRef.nativeElement as HTMLButtonElement ).innerHTML;
		console.log( '**** this.originalInnerHTML: ', this.originalInnerHTML );
	}


	handleLoadingState = () => {

		if ( this.appLoadingButton ) {
			this.loadSpinnerComponent();
			this.elementBtnRef.disabled = true;
		}
		else {
			this.elementBtnRef.disabled = false;
			this.elementBtnRef.innerHTML = this.originalInnerHTML;
			this.destroySpinnerComponent();
		}

	}


	loadSpinnerComponent = () => {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory( SpinnerComponent );
		this.viewContainerRef.clear();
		this.componentRef = this.viewContainerRef.createComponent<SpinnerComponent>( componentFactory );
		this.componentRef.instance.data = { size: 'small' };

		const domElem = ( this.componentRef.hostView as EmbeddedViewRef<any> ).rootNodes[ 0 ] as HTMLElement;
		this.elementBtnRef.textContent = '';
		this.elementBtnRef.appendChild( domElem );
	}


	destroySpinnerComponent = () => {
		if ( this.componentRef ) this.componentRef.destroy();
	}



}
