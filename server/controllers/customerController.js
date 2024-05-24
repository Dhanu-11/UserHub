const User = require('../models/customer');
const mongoose = require('mongoose');

/* 
* GET/
*Homepage
*/

exports.homepage = async(req, res)=> {
    const messages = req.flash('info');

    const locals ={
        title: 'AdminUser Suite',
        description: 'A comprehensive tool designed to handle user registrations, profile updates, and user authentication processes efficiently. Ideal for administrators seeking to maintain robust user data integrity and security.'
    };

    let perPage = 10;
    let page= req.query.page || 1;

    try{
        const users = await User.aggregate([{$sort: { updatedAt: 1}}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await User.countDocuments({});
        res.render('index', { 
            locals, 
            users,
            current: page,
            pages: Math.ceil(count/perPage),
            messages, 
        });

    }catch(error){
        console.log("Error: ", error)
    }
};

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
  
    try {
      res.render("about", locals);
    } catch (error) {
      console.log(error);
    }
  };


/* 
* GET/
*New User Form
*/

exports.addUser = async(req, res)=> {
    const locals ={
        title: 'Add New User',
        description: 'A comprehensive tool designed to handle user registrations, profile updates, and user authentication processes efficiently. Ideal for administrators seeking to maintain robust user data integrity and security.'
    };
    res.render('customer/addUser', locals );
};




/* 
* POST/
*Creat New User 
*/

exports.postUser = async(req, res)=> {

    console.log(req.body);


    const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details

    })
    try{
        await User.create(newUser);
        req.flash('info', 'New User has been added.');

        res.redirect('/');

    }catch(error){
        console.log('Error', error);
    }
    
};


/**
 * GET /
 * User Data
 */
exports.view = async (req, res) => {
    try {
      const customer = await User.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("customer/view", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * GET /
   * Edit User Data
   */
  exports.edit = async (req, res) => {
    try {
      const customer = await User.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Edit User Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("customer/edit", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * GET /
   * Update User Data
   */
  exports.editPost = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now(),
      });
      await res.redirect(`/edit/${req.params.id}`);
  
      console.log("redirected");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  /**
   * Delete /
   * Delete User Data
   */
  exports.deleteUser = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * Get /
   * Search User Data
   */
  exports.searchUser = async (req, res) => {
    const locals = {
      title: "Search Customer Data",
      description: "Free NodeJs User Management System",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const customers = await User.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });
  
      res.render("search", {
        customers,
        locals,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };