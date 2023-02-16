import bcrypt from 'bcrypt';
export const generatePassword = async (password: string, saltRounds: number = 10) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                reject(new Error('Error when generating password'));
            } else {
                resolve(hash);
            }
        });
    });
};
export const comparePassword = async (password: string, encryptedPassword: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, result) => {
            if (err) {
                console.log(err);
                reject(new Error('Error when comparing password'));
            } else {
                resolve(result);
            }
        });
    });
};
