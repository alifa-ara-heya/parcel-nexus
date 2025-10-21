import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { assignRoleZodSchema, createUserZodSchema, updateUserStatusZodSchema } from "./user.validation";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post('/register',
    validateRequest(createUserZodSchema),
    userController.createUser,
);

router.get('/me',
    checkAuth(Role.USER, Role.ADMIN, Role.DELIVERY_MAN, Role.RECEIVER, Role.SENDER),
    userController.getMyProfile,
);

router.get('/all-users',
    checkAuth(Role.USER, Role.ADMIN, Role.DELIVERY_MAN, Role.RECEIVER, Role.SENDER),
    userController.getAllUsers,
);

router.patch('/:id/assign-role',
    checkAuth(Role.ADMIN),
    validateRequest(assignRoleZodSchema),
    userController.assignRole,
);

router.patch('/:id/status',
    checkAuth(Role.ADMIN),
    validateRequest(updateUserStatusZodSchema),
    userController.updateUserStatus,
);

export const UserRoutes = router;
