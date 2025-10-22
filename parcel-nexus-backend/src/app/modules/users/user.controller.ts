/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    // The user's ID is attached to the request by the `checkAuth` middleware
    const userId = req.user!.userId.toString();
    const user = await userService.getMyProfile(userId);

    // Convert to a plain object to remove the password before sending the response
    const userResponse = user?.toObject();
    delete userResponse?.password;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: userResponse,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await userService.getAllUsers(page, limit);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All users retrieved successfully',
        data: result.users,
        meta: {
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            limit
        }
    });
});

const assignRole = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const { role } = req.body;

    const result = await userService.assignRole(userId, role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User role updated successfully',
        data: result,
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const { status } = req.body;
    const adminId = req.user!.userId;

    const result = await userService.updateUserStatus(userId, status, adminId.toString());

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User status updated successfully',
        data: result,
    });
});

export const userController = {
    createUser,
    getMyProfile,
    getAllUsers,
    assignRole,
    updateUserStatus,
};
