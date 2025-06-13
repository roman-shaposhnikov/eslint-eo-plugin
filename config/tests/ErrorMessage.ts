export class ErrorMessage extends String {
  constructor(private readonly message: string) {
    super(message)
  }

  toString(): string {
    return this.message.split("\n").slice(0, 2).join("\n")
  }
}
