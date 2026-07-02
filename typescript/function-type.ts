// In TypeScript, there are multiple ways to define a function type. Let's go from basic to advanced.

// 1. Function Type using Arrow Syntax (Most Common)
type AddFunction = (a: number, b: number) => number;

// Async Function Type
type FetchUser = (id: number) => Promise<string>;


// 2. Using Interface
// Interfaces can also describe function types.

interface AddFunction1 {
    (a: number, b: number): number;
}


// 3. Callback Function Type
// Very common in Node.js and Express.

type Callback = (message: string) => void;

//4. Real-World Example (Express Middleware)
type Middleware = (
    req: Request,
    res: Response,
    next: any
) => void;

const auth: Middleware = (req, res, next) => {
    console.log("Authenticated");
    next();
};



// | Syntax | Example |
// | --------------------------- | -------------------------------------- |
// | Type alias | `type Fn = (a: number) => string` |
// | Interface | `interface Fn { (a: number): string }` |
// | Function declaration | `function fn(a: number): string {}` |
// | Generic function            | `type Fn = <T>(arg: T) => T` |
// | Async function              | `type Fn = () => Promise<void>` |
// | Callback | `type Fn = (msg: string) => void` |
// | Function returning function | `type Fn = () => () => void` |
// | Existing function           | `type Fn = typeof existingFunction` |



// In Class

interface IUserService {
    createUser(name: string): Promise<void>;
    getUser(id: number): Promise<string>;
}


// class Implement karegi
class UserService implements IUserService {
    async createUser(name: string): Promise<void> {
        console.log(name);
    }

    async getUser(id: number): Promise<string> {
        return "Himanshu";
    }
}
