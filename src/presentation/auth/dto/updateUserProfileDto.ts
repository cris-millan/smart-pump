export class UpdateUserProfileDto {

    private constructor(
      public picture?: string,
      public age?: number,
      public eyeColor?: string,
      public company?: string,
      public phone?: string,
      public address?: string,

    ) {}
  
    static create( object: { [key:string]:any } ): [string?, UpdateUserProfileDto?] {
      const { picture, age, eyeColor, company, phone, address } = object;
      if (picture && picture.length < 1) return ['picture is not valid'];
      if (age && age < 1) return ['age is not valid'];
      if (eyeColor && eyeColor.length < 1) return ['eyeColor is not valid'];
      if (company && company.length < 1) return ['company is not valid'];
      if (phone && phone.length < 1) return ['phone is not valid'];
      if (address && address.length < 1) return ['address is not valid'];
  
      return [undefined, new UpdateUserProfileDto(picture, age, eyeColor, company, phone, address)];
  
    }
  
  
  }