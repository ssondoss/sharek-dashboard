export class PhoneAddress {
  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $phone
   * @return {string}
   */
  public get $phone(): string {
    return this.phone;
  }

  /**
   * Getter $category
   * @return {string}
   */
  public get $category(): string {
    return this.category;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Setter $phone
   * @param {string} value
   */
  public set $phone(value: string) {
    this.phone = value;
  }

  /**
   * Setter $category
   * @param {string} value
   */
  public set $category(value: string) {
    this.category = value;
  }
  private id: string;
  private name: string;
  private phone: string;
  private category: string;
}
