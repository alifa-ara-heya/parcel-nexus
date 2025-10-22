import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { parcelController } from './parcel.controller';
import { assignDeliveryManZodSchema, createParcelZodSchema, updateParcelStatusZodSchema } from './parcel.validation';
import { Role } from '../users/user.interface';

const router = Router();

router.post('/',
    checkAuth(Role.USER, Role.SENDER, Role.RECEIVER),
    validateRequest(createParcelZodSchema),
    parcelController.createParcel
);

router.get('/me',
    checkAuth(Role.USER, Role.SENDER, Role.RECEIVER),
    parcelController.getMyParcels
);

router.get('/incoming',
    checkAuth(Role.USER, Role.SENDER, Role.RECEIVER),
    parcelController.getIncomingParcels
);

router.get('/my-deliveries',
    checkAuth(Role.DELIVERY_MAN),
    parcelController.getMyDeliveries
);

router.get('/all',
    checkAuth(Role.ADMIN),
    parcelController.getAllParcels
);

// Public route for parcel tracking (no authentication required)
router.get('/track/:trackingNumber',
    parcelController.getParcelByTrackingNumber
);

router.get('/:id',
    checkAuth(Role.USER, Role.ADMIN, Role.SENDER, Role.RECEIVER),
    parcelController.getParcelById
);

router.patch('/:id/cancel',
    checkAuth(Role.USER, Role.ADMIN, Role.SENDER, Role.RECEIVER),
    parcelController.cancelParcel
);

router.patch('/:id/assign',
    checkAuth(Role.ADMIN),
    validateRequest(assignDeliveryManZodSchema),
    parcelController.assignDeliveryMan
);

router.patch('/:id/update-delivery-status',
    checkAuth(Role.DELIVERY_MAN, Role.ADMIN),
    validateRequest(updateParcelStatusZodSchema),
    parcelController.updateDeliveryStatusByDeliveryMan
);

router.patch('/:id/admin-update-status',
    checkAuth(Role.ADMIN),
    validateRequest(updateParcelStatusZodSchema),
    parcelController.updateParcelStatusByAdmin
);

router.patch('/:id/block',
    checkAuth(Role.ADMIN),
    parcelController.blockParcel
);

router.patch('/:id/unblock',
    checkAuth(Role.ADMIN),
    parcelController.unblockParcel
);

router.patch('/:id/confirm-delivery',
    checkAuth(Role.USER, Role.SENDER, Role.RECEIVER, Role.ADMIN),
    parcelController.confirmDelivery
);

export const ParcelRoutes = router;