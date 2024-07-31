export class User {
  constructor(
    public id: string,
    public name: string,
    public username: string,
  ) {}

  toJson() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
    };
  }

  // biome-ignore lint/suspicious/noExplicitAny: For simplicity, we're ignoring this rule
  static fromJson(json: any): User {
    return new User(json.id, json.name, json.username);
  }
}

export class UserWithPassword extends User {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public password: string,
  ) {
    super(id, name, username);
  }

  toJson() {
    return {
      ...super.toJson(),
      password: this.password,
    };
  }

  // biome-ignore lint/suspicious/noExplicitAny: For simplicity, we're ignoring this rule
  static fromJson(json: any): UserWithPassword {
    return new UserWithPassword(
      json.id,
      json.name,
      json.username,
      json.password,
    );
  }
}
