import MemberShip from "../models/memberShipmOdel.js";
import User from "../models/userModel.js";
import { calculateEndDate } from "../utils/timeHandler.js";

export const checkMember = async (req, res, next) => {
  try {
    const user = req.user;
    const isMember = await MemberShip.findOne({
      email: user?.email,
      Active: true,
    });
    if (!isMember) {
      return res.status(200).json({
        success: true,
        isMember: false,
      });
    }
    if (isMember.subscription.endDate <= new Date()) {
      isMember.Active = false;
      await isMember.save();
    }
    return res.status(200).json({
      success: true,
      isMember: isMember.Active,
    });
  } catch (error) {
    next(error);
  }
};

export const createMemberShip = async (req, res, next) => {
  try {
    const { paymentId, price, subscriptionPeriod } = req.body;

    const user = req.user;
    const isMember = await MemberShip.exists({
      email: user?.email,
    });

    if (isMember) {
      throw Error("You already an member");
    }
    const endDate = calculateEndDate(subscriptionPeriod);
    const member = await MemberShip.create({
      email: user?.email,
      joinDate: Date.now(),
      subscription: {
        price,
        subscriptionPeriod,
        endDate,
      },
      Active: true,
      paymentId: paymentId,
    });

    return res.status(201).json({
      success: true,
      message: "Membership created",
      member,
    });
  } catch (error) {
    next(error);
  }
};

export const getMembershipDetails = async (req, res, next) => {
  try {
    const user = req.user;
    const member = await MemberShip.findOne({
      email: user?.email,
    });
    if (!member) {
      throw Error("You have no membership");
    }

    return res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersWithMember = async (req, res, next) => {
  try {
    const usersWithMembers = [];
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
      const isMember = await MemberShip.findOne({
        email: users[i].email,
      });
      usersWithMembers.push({
        name: users[i].name,
        _id: users[i]._id,
        email: users[i].email,
        role: users[i].role,
        membership: isMember ? true : false,
        activeMember: isMember ? (isMember.Active ? true : false) : false,
      });
    }
    return res.status(201).json({
      success: true,
      message: "All users returns",
      usersWithMembers,
    });
  } catch (error) {
    next(error);
  }
};

export const userDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw Error("User not found");
    }
    const member = await MemberShip.findOne({
      email: user.email,
    });
    const userData = {
      user,
      member,
    };
    return res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    next(error);
  }
};
