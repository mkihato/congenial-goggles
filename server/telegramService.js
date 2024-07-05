const { MTProto } = require('telegram-mtproto');
// const input = require('input'); // Assuming 'input' is a module for handling input (adjust if necessary)

const api_id = process.env.TEL_APP_ID;  // Replace with your actual API ID
const api_hash = process.env.TEL_APP_HASH;  // Replace with your actual API hash

const phone = {
  num: process.env.TEL_NUMBER  // Replace with your actual phone number
};

const telegram = new MTProto({
  api_id,
  api_hash,
});


const sendCode = async () => {
  try {
    const result = await telegram.call('auth.sendCode', {
      phone_number: phone.num,
      settings: {
        _: 'codeSettings'
      }
    });
    console.log('sendCode result:', result);
    phone.codeHash = result.phone_code_hash;
  } catch (error) {
    console.error('Error in sendCode:', error);
  }
};

console.log('phone_code_hash:', phone.codeHash);
console.log('phone_code:', code);


// const signIn = async () => {
//   try {
//     const code = await input.text('Please enter the code you received: ');
//     const result = await telegram.call('auth.signIn', {
//       phone_number: phone.num,
//       phone_code_hash: phone.codeHash,
//       phone_code: code
//     });
//     console.log('signIn result:', result);
//   } catch (error) {
//     console.error('Error in signIn:', error);
//   }
// };

// const getPassword = async () => {
//   try {
//     const result = await telegram.call('account.getPassword');
//     console.log('getPassword result:', result);
//     return result;
//   } catch (error) {
//     console.error('Error in getPassword:', error);
//   }
// };

// const checkPassword = async (password) => {
//   try {
//     const result = await telegram.call('auth.checkPassword', {
//       password: {
//         _: 'inputCheckPasswordSRP',
//         srp_id: password.srp_id,
//         A: password.A,
//         M1: password.M1,
//       },
//     });
//     console.log('checkPassword result:', result);
//     return result;
//   } catch (error) {
//     console.error('Error in checkPassword:', error);
//   }
// };

// const main = async () => {
//   await sendCode();
//   await signIn();

//   const password = await getPassword();
//   if (password) {
//     const passwordInput = await input.text('Please enter your password: ');
//     await checkPassword({
//       srp_id: password.srp_id,
//       A: password.A,
//       M1: password.M1,
//       password: passwordInput,
//     });
//   }
// };

// main().catch(console.error);
