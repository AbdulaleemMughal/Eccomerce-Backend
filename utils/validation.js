const signUpValidation = (req) => {

    const { email, password } = req.body;

    if(!email) {
        throw new Error("Enter the valid Email");
    }; 
    if(!password) {
        throw new Error("Enter the strong password");
    };
};

module.exports = { signUpValidation };