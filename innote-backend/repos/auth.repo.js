//DATABASE LAYER
//insted of reepeting model everywhere we declared it here
//IMP:no error handling will be done here also in controller
const fs = require("fs");
const db = require("../models/index")

const User = db.dummy2;

//for signup
const SignUp = async (data) => {
    const user = await User.create({
        full_name: data.fullname,
        username: data.username,
        email_id: data.emailid,
        phnumber: data.phnumber,
        DOB: data.DOB,
        country: data.country,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        password: data.password,
    });
    await Cart.create({ customer_id: user.dataValues.customer_id }); // Here i am inserting user details into cart table
    return user;
};

//for login
const SignIn = async (data) => {
    const user = await User.findAll({});
    // Here i used the below code to update existing user cart data
    // for (let i = 0; i < user.length; i++) {
    //     const [cart, created] = await Cart.findOrCreate({ where: { customer_id: user[i].dataValues.customer_id } });
    //     console.log(created);
    // }
    return User.findOne({ where: { username: data.username } });
};

const SignUp2 = async (fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password) => {
    await User.create({
        full_name: fullname,
        username: username,
        email_id: emailid,
        phnumber: phnumber,
        DOB: DOB,
        country: country,
        state: state,
        city: city,
        pincode: pincode,
        password: password,
    });
};
// let username = req.body.username;
// let fullName = req.body.fullName;
// let emailid = req.body.emailid;
// let password;

// await bcrypt.hash(req.body.password, 10).then(function (hash) {
//     password = hash;
// });
// const data = await User.create({
//     full_name: fullName,
//     user_name: username,
//     password: password,
//     email_id: emailid,
// });
// message = "Data added successfully"

//User Profile View:
const Profile = async (username) => {
    // console.log(username)

    // const data = await User.findOne({
    // }, {
    //     where: { username },
    //     attributes: { include: ["full_name", "email_id", "phnumber", "DOB", "country", "state", "city", "pincode", "profile_image"] },
    // });
    const data = await User.findOne({ where: { username: username } });

    // console.log(data.dataValues);
    // const data2 = data.dataValues;
    // console.log(data2.full_name)
    // const data3 = data2.full_name
    // const data4 = data2.email_id
    // const data5 = data2.phnumber
    // const data6 = data2.full_name
    // const data7 = data2.full_name
    // const data8 = data2.full_name

    return data.dataValues;
};

const UpdProf = async (fullname, emailid, phnumber, DOB, country, state, city, pincode) => {
    // await User()
    // await bcrypt.hash(password, 10).then(function (hash) {
    //     password = hash;
    // console.log(hash);
    // console.log(password);
    // console.log(phnumber);
    // });
    const username = "amitpatra"
    await User.update({
        full_name: fullname,
        email_id: emailid,
        phnumber: phnumber,
        DOB: DOB,
        country: country,
        state: state,
        city: city,
        pincode: pincode
    }, { where: { username } });
};

const UpdProfPIC = async (username, file) => {
    await uImage.create({
        username: username,
        type: file.mimetype,
        name: file.filename,
        data: fs.readFileSync("resources/uploads/" + file.filename
        ),
    }).then((image) => {
        fs.writeFileSync("resources/tmp/" + image.name,
            image.data
        );
    });
    return true;
};

const DelProf = async (param) => {
    const username = "Evan.Pouros"
    // await User.destroy({
    //     full_name,
    //     email_id,
    //     phnumber,
    //     DOB,
    //     country,
    //     state,
    //     city,
    //     pincode
    // }, { where: { username: param } });
    await User.destroy({ where: { username: param } });
};

const DelUser = async (param) => {
    await User.destroy({ where: { username: param } });
};

const AddUse = async (username, hash_password) => {
    await User.create({
        username: username,
        password: hash_password
    });
};

const SavedAddressViewUser = async (username) => {
    const data = await User.findAll({ where: { isAdmin: false } });
    return data;
};
//----------------------------------------------------------------------------------------------------------------------------------------------
//COMPLETE ADMIN PAGE---------------------------------------------------------------------------------------------------------------------------COMPLETE ADMIN PAGE
//..//User Management
//User List
const ViewUser = async (username) => {
    const data = await User.findAll({ where: { isAdmin: false } });
    return data;
};
//----------------------------------------------------------------------------------------------->
//..//Role Management
//Role List
const ViewRole = async (username) => {
    const data = await role_table.findAll({});
    return data;
};
//Role List
const ViewClaim = async (role_id) => {
    const data = await Role_Claims.findAll({
        where: { role_id: role_id },
        // include: {
        //     model: Role_Claims,
        //     attributes: ["roleclaim_name"]
        // },
    });
    const data1 = data.dataValues;
    // console.log(data1)
    return data;
};
//Role Add(OLD METHOD)
// const AddRole = async (role_name, role_isactive, role_desc, claim) => {
//     const data = await role_table.create({
//         role_name: role_name,
//         role_isactive: role_isactive,
//         role_desc: role_desc,
//     });
//     if (data.dataValues.role_id) {
//         for (let i = 0; i < claim.length; i++) {
//             await role_table.create({
//                 role_id: data.dataValues.role_id,
//                 roleclaim_name: claim[i].name,
//             })
//         }
//     }
//     console.log(data);
//     return data;
// };
//Role Add NEW METHOD
const AddRole = async (role_name, role_isactive, role_desc, claim) => {
    const data = await role_table.create({
        role_name: role_name,
        role_isactive: role_isactive,
        role_desc: role_desc,
    });
    if (data) {
        const roleclaim = claim.map(el => {
            return {
                role_id: data.dataValues.role_id,
                roleclaim_name: el,
            }
        })
        // console.log(roleclaim)
        const data2 = await Role_Claims.bulkCreate(roleclaim)
        return data2;
    } else {
        console.log("no data set in role claim data")
    }
};
//Role Add NEW METHOD
const EditRole = async (role_id, role_name, role_isactive, role_desc, claim) => {
    const data = await role_table.update({
        role_name: role_name,
        role_isactive: role_isactive,
        role_desc: role_desc
    },
        { where: { role_id: role_id } }
    );
    if (data) {
        const data2 = await Role_Claims.destroy({ where: { role_id: role_id } })
        if (data !== null) {
            const roleclaim = claim.map(el => {
                return {
                    role_id: role_id,
                    roleclaim_name: el,
                }
            })
            // console.log(roleclaim)
            const data3 = await Role_Claims.bulkCreate(roleclaim)
            return data3;
        } else {
            console.log("no data set in role claim data")
        }
    } else return false;

};
//To Delete Role
const DeleteRole = async (username, role_id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    console.log(user_db.dataValues.isAdmin)
    console.log(role_id)
    if (user_db.dataValues.isAdmin) {
        const data2 = await Role_Claims.destroy({ where: { role_id: role_id } })
        if (data2 != null) {
            const data1 = await role_table.destroy({ where: { role_id: role_id } });
            if (data1 != null) {
                console.log(data2)
                console.log(data1)
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
};
//----------------------------------------------------------------------------------------------->
// For 2FA Store OTP process
const SendOtp2FA = async (username, otp) => {
    const data = await User.findOne({ where: { username: username } });
    if (data) {
        await fOtps.create({
            username: username,
            otp: otp,
            user_id: data.id,
            for_twoFA: true,
        })
        return data.dataValues;
    }
};
// For 2FA Verify OTP process
const VErifyOtp2FA = async (username, otp) => {
    console.log("First Line")
    const fiveMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);//only data saved within five minute taken(as of now changed to 10 minutes)
    const { Op } = require("sequelize");
    // console.log(username)

    const data = await fOtps.findOne({
        where: {
            // user_id: username,
            for_twoFA: {
                [Op.eq]: true
            },
            isUsed: {
                [Op.eq]: false
            },
            timestamp: {
                [Op.gt]: fiveMinutesAgo
            },
            username: {
                [Op.eq]: username
            },
        },
        order: [['timestamp', 'DESC']]
    });
    console.log(data.dataValues.otp);
    console.log(data.dataValues.id)
    console.log("Last Line")
    //for table destruction
    if (data.dataValues.otp == otp) {
        console.log("Successfully")
        await fOtps.update({
            isUsed: true
        }, {
            where: {
                id: data.dataValues.id
            }
        })
        await fOtps.destroy({
            where: {
                for_twoFA: {
                    [Op.eq]: true
                },
                // isUsed: {
                //     [Op.eq]: true
                // },
                timestamp: {
                    [Op.lt]: fiveMinutesAgo
                },
                username: {
                    [Op.eq]: username
                },
            },
        })
    }
    else {
        console.log("Failure")
    }

    // if (data) {
    //     await fOtps.update({
    //         isUsed: 'TRUE',
    //     })
    // }
    // return data.dataValues.otp;
};
//----------------------------------------------------------------------------------------------->
//Forgot Password
const ForgPass = async (username, otp) => {
    const data = await User.findOne({
        where: { username: username },
        attributes: [['email_id', 'email'], 'username', 'customer_id', ['full_name', 'name']]
    });
    // console.log(data);
    // const data = await User.findOne({ email: email_id, name: full_name, username: username }, { where: { username: username } }); // the first parameter user for search criteria
    if (data && data.dataValues.username == username) {
        const { username, email, name, ...rest } = data.dataValues;
        const data2 = { ...rest, otp, FP_TFA: false, };
        const data3 = [];
        data3[0] = data2;
        console.log(data3);
        // const [customerVerify, created] = await Otps.findOne({
        const customerVerify = await Otps.findOne({
            where: { customer_id: data2.customer_id },
            attributes: ['customer_id']
        });
        if (customerVerify.customer_id == data2.customer_id) {
            await Otps.update(data2, { where: { customer_id: data2.customer_id } })
        } else {
            await Otps.create(data2)
        }
        return data.dataValues
    } else {
        return data;
    }
};
const ForgPass2 = async (username, otp) => {
    const data = await User.findOne({
        where: { username: username },
        attributes: [['email_id', 'email'], 'username', 'customer_id', ['full_name', 'name']]
    });
    // console.log(data);
    // const data = await User.findOne({ email: email_id, name: full_name, username: username }, { where: { username: username } }); // the first parameter user for search criteria
    if (data && data.dataValues.username == username) {
        const { username, email, name, ...rest } = data.dataValues;
        const data2 = { ...rest, otp, FP_TFA: false, };
        const data3 = [];
        data3[0] = data2;
        console.log(data3);
        await Otps.create(data2)
        // await Otps.create({
        //     username: username,
        //     otp: otp,
        //     user_id: data.dataValues.id,
        //     FP_TFA: false,
        // })

        // await Otps.upsert(
        //     // {
        //     //   name: username,
        //     //   results: surveyData,
        //     // },
        //     data2,
        //     { customer_id: data2.customer_id }
        // )

        // await Otps.updateOrCreate(data.dataValues.customer_id, { otp: otp, FP_TFA: false });
        // return data.dataValues.email_id;


        // 3RD
        // const [customerVerify, created] = await Otps.upsert({
        //     customer_id: data2.customer_id,
        //     otp: otp,
        //     FP_TFA: false
        // }, {
        //     where: { customer_id: data2.customer_id },
        //     returning: true // This ensures that the updated or inserted record is returned
        // });
        // if (created) {
        //     return data.dataValues.email_id;
        // }

        //4TH
        // const [user, created] = await Otps.findOrCreate({
        //     where: { customer_id: data2.customer_id, otp: data2.otp },
        //     defaults: data2 // Use 'defaults' to specify the data to create if the record doesn't exist
        // })
        // console.log(user.toJSON())
        // console.log(created)

        //5TH
        // await Otps.bulkCreate(data3, {
        //     fields: ['customer_id', 'FP_TFA', 'otp'], // Fields to insert
        //     updateOnDuplicate: ['customer_id'], // Field to check for duplicate on
        // });
    }
    return data;
};

// const VerifyOTP = async (data) => {
//     const data = await User.update(
//         { password: data.newpassword},
//         { where: { username: username } }
//     );
//     await fOtps.create({
//         user_id: data.id,
//         otp: otp
//     })
//     return data.dataValues.email_id;
// };
// where: { username: username },
// attributes: [['email_id', 'email'], 'username', 'customer_id', ['full_name', 'name']]
const ResetPass = async (data) => {
    const cid = '2';
    const dbOtp = await Otps.findOne({
        where: { customer_id: cid, FP_TFA: false, isUsed: false },
        attributes: ['otp']
    });
    if (data.otp == dbOtp.otp) {
        const data1 = await User.update(
            { password: data.newpassword },
            { where: { username: username } }
        );
        await fOtps.update({
            isUsed: 'TRUE',
        })
    }
    return data.dataValues.email_id;
};
// Verify OTP and handle deletion or setting to null
const ResetPass2 = async (customer_id, otp) => {
    try {
        // Find the OTP record by user ID and OTP value, and delete it in the same query
        const otpRecord = await Otp.destroy({
            where: {
                userId,
                otpValue,
            },
        });

        return otpRecord > 0; // Return true if a record was deleted (OTP was correct), otherwise false
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false; // Return false in case of errors
    }
};

//-------------------------------------------------------------------------------------------
//To Add Template
const AddETemp = async (name, title, description) => {
    const data = await EmailTemp.create({
        templatename: name,
        title: title,
        body: description
    });
    return data;
};
//To View Template
const ViewETemp = async (name, title, description) => {
    const data = await EmailTemp.findAll({
    });
    // console.log(data.dataValues)
    // console.log("hello")
    return data;
};
//To Delete Template
const DeleETemp = async (username, id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    if (user_db.dataValues.isAdmin) {
        const data1 = await EmailTemp.destroy(
            { where: { id: id } }
        );
        return true;
    } else {
        return false;
    }
};

//-------------------------------------------------------------------------------------------
//To Add Config
const AddEConfig = async (name, title, description) => {
    const data = await ConfigTbl.create({
        configname: name,
        title: title,
        description: description
    });
    return data;
};
//To View Config
const ViewEConfig = async (name, title, description) => {
    const data = await ConfigTbl.findAll({
    });
    // console.log(data.dataValues)
    // console.log("hello")
    return data;
};
//To Update Config
const UpdateEConfig = async (name, title, description, config_id) => {
    const data = await ConfigTbl.update({
        configname: name,
        title: title,
        description: description
    }, { where: { config_id: config_id } });
    if (data) {
        return true;
    } else {
        return false;
    }
};
//To Delete Config
const DeleEConfig = async (username, config_id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    console.log(user_db.dataValues)
    console.log(config_id)
    if (user_db.dataValues.isAdmin) {
        const data1 = await ConfigTbl.destroy(
            { where: { config_id: config_id } }
        );
        return true;
    } else {
        return false;
    }
};

//---------------------------------------------------------------------------------------
//User Location Data
const AddELoc = async (businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status) => {
    const data = await LocationTbl.create({
        businessName: businessName,
        businessWebsite: businessWebsite,
        city: city,
        continent: continent,
        country: country,
        countryCode: countryCode,
        ipName: ipName,
        ipType: ipType,
        isp: isp,
        lat: lat,
        lon: lon,
        org: org,
        query: query,
        region: region,
        status: status
    });
    return data;
};
//---------------------------------------------------------------------------------------

//this is used to update password later
// const UpdtPass = async (username) => {
//     const data = await User.findOne({ where: { username: username } });
//     return data;
// };

//---------------------------------------------------------------------------------------
//PRODUCTS LIST
const ViewProducts = async (username) => {
    const data = await ProductsTbl.findAll({});
    return data;
};

module.exports = {
    SignIn,
    // SignUp,
}