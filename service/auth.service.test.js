const auth_service = require("./auth.service")
const { prismaMock } = require('../test/singleton')

describe("registerUser - unit test", () => {
    it("User register fails with error", async () => {
        const user = {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            password: "john@123"
          }
        
        prismaMock.user.findFirst.mockResolvedValue(user)
        auth_service.registerUser(user).catch(data => {
            expect(data.message).toBe('User already present with specified email!')
        });
    });
    it("User register successfully", async () => {
        const user =  {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            password: "john@123"
          }
        
        prismaMock.user.create.mockResolvedValue(user)
        auth_service.registerUser(user).then(data => {
            expect(data).toBe(`User is registered successfuly for ${user.email}`)
        });
    });
});