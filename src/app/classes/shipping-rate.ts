export class ShippingRate {
    countryCode: string;
    rates: Rate[] = [];
}

export class Rate {
    weight: number;
    cost: number;
}
