import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ModalComponent} from './modal.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule.forRoot()],
            providers: [
                NgbModal,
                NgbActiveModal,
            ],
            declarations: [ModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`Check initial parameters`, async(() => {
        let fixture = TestBed.createComponent(ModalComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.dialog).toEqual(0);
    }));

});
