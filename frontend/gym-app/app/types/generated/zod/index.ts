import { z } from 'zod';
import type { Prisma } from '../../../../../../backend/generated/prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','createdAt','emailVerified','image','passwordHash','provider','providerId','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const AuthenticatorScalarFieldEnumSchema = z.enum(['credentialID','userId','providerAccountId','credentialPublicKey','counter','credentialDeviceType','credentialBackedUp','transports']);

export const HeightLogScalarFieldEnumSchema = z.enum(['id','userId','heightCm','recordedAt']);

export const WeightLogScalarFieldEnumSchema = z.enum(['id','userId','weightKg','recordedAt']);

export const WorkoutPlanScalarFieldEnumSchema = z.enum(['id','userId','name','createdAt','muscleGroups']);

export const WorkoutDayScalarFieldEnumSchema = z.enum(['id','planId','name','dayOfWeek']);

export const ExerciseScalarFieldEnumSchema = z.enum(['id','name','description','userDefined','createdById','muscleGroups']);

export const WorkoutDayExerciseScalarFieldEnumSchema = z.enum(['id','dayId','exerciseId','order','sets','reps','weights','restSeconds']);

export const WorkoutLogScalarFieldEnumSchema = z.enum(['id','userId','exerciseId','performedAt','setsCompleted','repsPerSet','weightPerSet','notes']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const MuscleGroupSchema = z.enum(['CHEST','BACK','LEGS','SHOULDERS','BICEPS','TRICEPS','CORE','GLUTES','FULL_BODY']);

export type MuscleGroupType = `${z.infer<typeof MuscleGroupSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  passwordHash: z.string().nullable(),
  provider: z.string().nullable(),
  providerId: z.string().nullable(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  Authenticators: AuthenticatorWithRelations[];
  createdExercises: ExerciseWithRelations[];
  heightLogs: HeightLogWithRelations[];
  sessions: SessionWithRelations[];
  weightLogs: WeightLogWithRelations[];
  workoutLogs: WorkoutLogWithRelations[];
  workoutPlans: WorkoutPlanWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  Authenticators: z.lazy(() => AuthenticatorWithRelationsSchema).array(),
  createdExercises: z.lazy(() => ExerciseWithRelationsSchema).array(),
  heightLogs: z.lazy(() => HeightLogWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  weightLogs: z.lazy(() => WeightLogWithRelationsSchema).array(),
  workoutLogs: z.lazy(() => WorkoutLogWithRelationsSchema).array(),
  workoutPlans: z.lazy(() => WorkoutPlanWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// AUTHENTICATOR SCHEMA
/////////////////////////////////////////

export const AuthenticatorSchema = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullable(),
})

export type Authenticator = z.infer<typeof AuthenticatorSchema>

// AUTHENTICATOR RELATION SCHEMA
//------------------------------------------------------

export type AuthenticatorRelations = {
  user: UserWithRelations;
};

export type AuthenticatorWithRelations = z.infer<typeof AuthenticatorSchema> & AuthenticatorRelations

export const AuthenticatorWithRelationsSchema: z.ZodType<AuthenticatorWithRelations> = AuthenticatorSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// HEIGHT LOG SCHEMA
/////////////////////////////////////////

export const HeightLogSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  heightCm: z.number(),
  recordedAt: z.coerce.date(),
})

export type HeightLog = z.infer<typeof HeightLogSchema>

// HEIGHT LOG RELATION SCHEMA
//------------------------------------------------------

export type HeightLogRelations = {
  user: UserWithRelations;
};

export type HeightLogWithRelations = z.infer<typeof HeightLogSchema> & HeightLogRelations

export const HeightLogWithRelationsSchema: z.ZodType<HeightLogWithRelations> = HeightLogSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// WEIGHT LOG SCHEMA
/////////////////////////////////////////

export const WeightLogSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  weightKg: z.number(),
  recordedAt: z.coerce.date(),
})

export type WeightLog = z.infer<typeof WeightLogSchema>

// WEIGHT LOG RELATION SCHEMA
//------------------------------------------------------

export type WeightLogRelations = {
  user: UserWithRelations;
};

export type WeightLogWithRelations = z.infer<typeof WeightLogSchema> & WeightLogRelations

export const WeightLogWithRelationsSchema: z.ZodType<WeightLogWithRelations> = WeightLogSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// WORKOUT PLAN SCHEMA
/////////////////////////////////////////

export const WorkoutPlanSchema = z.object({
  muscleGroups: MuscleGroupSchema.array(),
  id: z.string().cuid(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
})

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>

// WORKOUT PLAN RELATION SCHEMA
//------------------------------------------------------

export type WorkoutPlanRelations = {
  workoutDays: WorkoutDayWithRelations[];
  user: UserWithRelations;
};

export type WorkoutPlanWithRelations = z.infer<typeof WorkoutPlanSchema> & WorkoutPlanRelations

export const WorkoutPlanWithRelationsSchema: z.ZodType<WorkoutPlanWithRelations> = WorkoutPlanSchema.merge(z.object({
  workoutDays: z.lazy(() => WorkoutDayWithRelationsSchema).array(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// WORKOUT DAY SCHEMA
/////////////////////////////////////////

export const WorkoutDaySchema = z.object({
  id: z.string().cuid(),
  planId: z.string(),
  name: z.string(),
  dayOfWeek: z.number().int(),
})

export type WorkoutDay = z.infer<typeof WorkoutDaySchema>

// WORKOUT DAY RELATION SCHEMA
//------------------------------------------------------

export type WorkoutDayRelations = {
  plan: WorkoutPlanWithRelations;
  exercises: WorkoutDayExerciseWithRelations[];
};

export type WorkoutDayWithRelations = z.infer<typeof WorkoutDaySchema> & WorkoutDayRelations

export const WorkoutDayWithRelationsSchema: z.ZodType<WorkoutDayWithRelations> = WorkoutDaySchema.merge(z.object({
  plan: z.lazy(() => WorkoutPlanWithRelationsSchema),
  exercises: z.lazy(() => WorkoutDayExerciseWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// EXERCISE SCHEMA
/////////////////////////////////////////

export const ExerciseSchema = z.object({
  muscleGroups: MuscleGroupSchema.array(),
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  userDefined: z.boolean(),
  createdById: z.string().nullable(),
})

export type Exercise = z.infer<typeof ExerciseSchema>

// EXERCISE RELATION SCHEMA
//------------------------------------------------------

export type ExerciseRelations = {
  createdBy?: UserWithRelations | null;
  workoutDayLinks: WorkoutDayExerciseWithRelations[];
  workoutLogs: WorkoutLogWithRelations[];
};

export type ExerciseWithRelations = z.infer<typeof ExerciseSchema> & ExerciseRelations

export const ExerciseWithRelationsSchema: z.ZodType<ExerciseWithRelations> = ExerciseSchema.merge(z.object({
  createdBy: z.lazy(() => UserWithRelationsSchema).nullable(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseWithRelationsSchema).array(),
  workoutLogs: z.lazy(() => WorkoutLogWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// WORKOUT DAY EXERCISE SCHEMA
/////////////////////////////////////////

export const WorkoutDayExerciseSchema = z.object({
  id: z.string().cuid(),
  dayId: z.string(),
  exerciseId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number(),
  restSeconds: z.number().int(),
})

export type WorkoutDayExercise = z.infer<typeof WorkoutDayExerciseSchema>

// WORKOUT DAY EXERCISE RELATION SCHEMA
//------------------------------------------------------

export type WorkoutDayExerciseRelations = {
  day: WorkoutDayWithRelations;
  exercise: ExerciseWithRelations;
};

export type WorkoutDayExerciseWithRelations = z.infer<typeof WorkoutDayExerciseSchema> & WorkoutDayExerciseRelations

export const WorkoutDayExerciseWithRelationsSchema: z.ZodType<WorkoutDayExerciseWithRelations> = WorkoutDayExerciseSchema.merge(z.object({
  day: z.lazy(() => WorkoutDayWithRelationsSchema),
  exercise: z.lazy(() => ExerciseWithRelationsSchema),
}))

/////////////////////////////////////////
// WORKOUT LOG SCHEMA
/////////////////////////////////////////

export const WorkoutLogSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  exerciseId: z.string(),
  performedAt: z.coerce.date(),
  setsCompleted: z.number().int(),
  repsPerSet: z.number().int().array(),
  weightPerSet: z.number().array(),
  notes: z.string().nullable(),
})

export type WorkoutLog = z.infer<typeof WorkoutLogSchema>

// WORKOUT LOG RELATION SCHEMA
//------------------------------------------------------

export type WorkoutLogRelations = {
  exercise: ExerciseWithRelations;
  user: UserWithRelations;
};

export type WorkoutLogWithRelations = z.infer<typeof WorkoutLogSchema> & WorkoutLogRelations

export const WorkoutLogWithRelationsSchema: z.ZodType<WorkoutLogWithRelations> = WorkoutLogSchema.merge(z.object({
  exercise: z.lazy(() => ExerciseWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Authenticators: z.union([z.boolean(),z.lazy(() => AuthenticatorFindManyArgsSchema)]).optional(),
  createdExercises: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  heightLogs: z.union([z.boolean(),z.lazy(() => HeightLogFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  weightLogs: z.union([z.boolean(),z.lazy(() => WeightLogFindManyArgsSchema)]).optional(),
  workoutLogs: z.union([z.boolean(),z.lazy(() => WorkoutLogFindManyArgsSchema)]).optional(),
  workoutPlans: z.union([z.boolean(),z.lazy(() => WorkoutPlanFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  Authenticators: z.boolean().optional(),
  createdExercises: z.boolean().optional(),
  heightLogs: z.boolean().optional(),
  sessions: z.boolean().optional(),
  weightLogs: z.boolean().optional(),
  workoutLogs: z.boolean().optional(),
  workoutPlans: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Authenticators: z.union([z.boolean(),z.lazy(() => AuthenticatorFindManyArgsSchema)]).optional(),
  createdExercises: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  heightLogs: z.union([z.boolean(),z.lazy(() => HeightLogFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  weightLogs: z.union([z.boolean(),z.lazy(() => WeightLogFindManyArgsSchema)]).optional(),
  workoutLogs: z.union([z.boolean(),z.lazy(() => WorkoutLogFindManyArgsSchema)]).optional(),
  workoutPlans: z.union([z.boolean(),z.lazy(() => WorkoutPlanFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// AUTHENTICATOR
//------------------------------------------------------

export const AuthenticatorIncludeSchema: z.ZodType<Prisma.AuthenticatorInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AuthenticatorArgsSchema: z.ZodType<Prisma.AuthenticatorDefaultArgs> = z.object({
  select: z.lazy(() => AuthenticatorSelectSchema).optional(),
  include: z.lazy(() => AuthenticatorIncludeSchema).optional(),
}).strict();

export const AuthenticatorSelectSchema: z.ZodType<Prisma.AuthenticatorSelect> = z.object({
  credentialID: z.boolean().optional(),
  userId: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  credentialPublicKey: z.boolean().optional(),
  counter: z.boolean().optional(),
  credentialDeviceType: z.boolean().optional(),
  credentialBackedUp: z.boolean().optional(),
  transports: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// HEIGHT LOG
//------------------------------------------------------

export const HeightLogIncludeSchema: z.ZodType<Prisma.HeightLogInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const HeightLogArgsSchema: z.ZodType<Prisma.HeightLogDefaultArgs> = z.object({
  select: z.lazy(() => HeightLogSelectSchema).optional(),
  include: z.lazy(() => HeightLogIncludeSchema).optional(),
}).strict();

export const HeightLogSelectSchema: z.ZodType<Prisma.HeightLogSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  heightCm: z.boolean().optional(),
  recordedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// WEIGHT LOG
//------------------------------------------------------

export const WeightLogIncludeSchema: z.ZodType<Prisma.WeightLogInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WeightLogArgsSchema: z.ZodType<Prisma.WeightLogDefaultArgs> = z.object({
  select: z.lazy(() => WeightLogSelectSchema).optional(),
  include: z.lazy(() => WeightLogIncludeSchema).optional(),
}).strict();

export const WeightLogSelectSchema: z.ZodType<Prisma.WeightLogSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  weightKg: z.boolean().optional(),
  recordedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// WORKOUT PLAN
//------------------------------------------------------

export const WorkoutPlanIncludeSchema: z.ZodType<Prisma.WorkoutPlanInclude> = z.object({
  workoutDays: z.union([z.boolean(),z.lazy(() => WorkoutDayFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkoutPlanArgsSchema: z.ZodType<Prisma.WorkoutPlanDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutPlanSelectSchema).optional(),
  include: z.lazy(() => WorkoutPlanIncludeSchema).optional(),
}).strict();

export const WorkoutPlanCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkoutPlanCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutPlanCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkoutPlanCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkoutPlanCountOutputTypeSelect> = z.object({
  workoutDays: z.boolean().optional(),
}).strict();

export const WorkoutPlanSelectSchema: z.ZodType<Prisma.WorkoutPlanSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  muscleGroups: z.boolean().optional(),
  workoutDays: z.union([z.boolean(),z.lazy(() => WorkoutDayFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKOUT DAY
//------------------------------------------------------

export const WorkoutDayIncludeSchema: z.ZodType<Prisma.WorkoutDayInclude> = z.object({
  plan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
  exercises: z.union([z.boolean(),z.lazy(() => WorkoutDayExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkoutDayArgsSchema: z.ZodType<Prisma.WorkoutDayDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutDaySelectSchema).optional(),
  include: z.lazy(() => WorkoutDayIncludeSchema).optional(),
}).strict();

export const WorkoutDayCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkoutDayCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutDayCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkoutDayCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkoutDayCountOutputTypeSelect> = z.object({
  exercises: z.boolean().optional(),
}).strict();

export const WorkoutDaySelectSchema: z.ZodType<Prisma.WorkoutDaySelect> = z.object({
  id: z.boolean().optional(),
  planId: z.boolean().optional(),
  name: z.boolean().optional(),
  dayOfWeek: z.boolean().optional(),
  plan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
  exercises: z.union([z.boolean(),z.lazy(() => WorkoutDayExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EXERCISE
//------------------------------------------------------

export const ExerciseIncludeSchema: z.ZodType<Prisma.ExerciseInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workoutDayLinks: z.union([z.boolean(),z.lazy(() => WorkoutDayExerciseFindManyArgsSchema)]).optional(),
  workoutLogs: z.union([z.boolean(),z.lazy(() => WorkoutLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ExerciseArgsSchema: z.ZodType<Prisma.ExerciseDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseSelectSchema).optional(),
  include: z.lazy(() => ExerciseIncludeSchema).optional(),
}).strict();

export const ExerciseCountOutputTypeArgsSchema: z.ZodType<Prisma.ExerciseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ExerciseCountOutputTypeSelectSchema: z.ZodType<Prisma.ExerciseCountOutputTypeSelect> = z.object({
  workoutDayLinks: z.boolean().optional(),
  workoutLogs: z.boolean().optional(),
}).strict();

export const ExerciseSelectSchema: z.ZodType<Prisma.ExerciseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  userDefined: z.boolean().optional(),
  createdById: z.boolean().optional(),
  muscleGroups: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workoutDayLinks: z.union([z.boolean(),z.lazy(() => WorkoutDayExerciseFindManyArgsSchema)]).optional(),
  workoutLogs: z.union([z.boolean(),z.lazy(() => WorkoutLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKOUT DAY EXERCISE
//------------------------------------------------------

export const WorkoutDayExerciseIncludeSchema: z.ZodType<Prisma.WorkoutDayExerciseInclude> = z.object({
  day: z.union([z.boolean(),z.lazy(() => WorkoutDayArgsSchema)]).optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
}).strict()

export const WorkoutDayExerciseArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutDayExerciseSelectSchema).optional(),
  include: z.lazy(() => WorkoutDayExerciseIncludeSchema).optional(),
}).strict();

export const WorkoutDayExerciseSelectSchema: z.ZodType<Prisma.WorkoutDayExerciseSelect> = z.object({
  id: z.boolean().optional(),
  dayId: z.boolean().optional(),
  exerciseId: z.boolean().optional(),
  order: z.boolean().optional(),
  sets: z.boolean().optional(),
  reps: z.boolean().optional(),
  weights: z.boolean().optional(),
  restSeconds: z.boolean().optional(),
  day: z.union([z.boolean(),z.lazy(() => WorkoutDayArgsSchema)]).optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
}).strict()

// WORKOUT LOG
//------------------------------------------------------

export const WorkoutLogIncludeSchema: z.ZodType<Prisma.WorkoutLogInclude> = z.object({
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WorkoutLogArgsSchema: z.ZodType<Prisma.WorkoutLogDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutLogSelectSchema).optional(),
  include: z.lazy(() => WorkoutLogIncludeSchema).optional(),
}).strict();

export const WorkoutLogSelectSchema: z.ZodType<Prisma.WorkoutLogSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  exerciseId: z.boolean().optional(),
  performedAt: z.boolean().optional(),
  setsCompleted: z.boolean().optional(),
  repsPerSet: z.boolean().optional(),
  weightPerSet: z.boolean().optional(),
  notes: z.boolean().optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  providerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorListRelationFilterSchema).optional(),
  createdExercises: z.lazy(() => ExerciseListRelationFilterSchema).optional(),
  heightLogs: z.lazy(() => HeightLogListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  weightLogs: z.lazy(() => WeightLogListRelationFilterSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogListRelationFilterSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  providerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorOrderByRelationAggregateInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseOrderByRelationAggregateInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogOrderByRelationAggregateInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogOrderByRelationAggregateInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string(),
    providerId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    providerId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
    providerId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    providerId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  providerId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorListRelationFilterSchema).optional(),
  createdExercises: z.lazy(() => ExerciseListRelationFilterSchema).optional(),
  heightLogs: z.lazy(() => HeightLogListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  weightLogs: z.lazy(() => WeightLogListRelationFilterSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogListRelationFilterSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  providerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  providerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
})
.and(z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuthenticatorWhereInputSchema: z.ZodType<Prisma.AuthenticatorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthenticatorWhereInputSchema),z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorWhereInputSchema),z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AuthenticatorOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithRelationInput> = z.object({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AuthenticatorWhereUniqueInputSchema: z.ZodType<Prisma.AuthenticatorWhereUniqueInput> = z.union([
  z.object({
    userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema),
    credentialID: z.string()
  }),
  z.object({
    userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema),
  }),
  z.object({
    credentialID: z.string(),
  }),
])
.and(z.object({
  credentialID: z.string().optional(),
  userId_credentialID: z.lazy(() => AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AuthenticatorWhereInputSchema),z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorWhereInputSchema),z.lazy(() => AuthenticatorWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AuthenticatorOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthenticatorOrderByWithAggregationInput> = z.object({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AuthenticatorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AuthenticatorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthenticatorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthenticatorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AuthenticatorSumOrderByAggregateInputSchema).optional()
}).strict();

export const AuthenticatorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthenticatorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const HeightLogWhereInputSchema: z.ZodType<Prisma.HeightLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HeightLogWhereInputSchema),z.lazy(() => HeightLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HeightLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HeightLogWhereInputSchema),z.lazy(() => HeightLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  heightCm: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const HeightLogOrderByWithRelationInputSchema: z.ZodType<Prisma.HeightLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  heightCm: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const HeightLogWhereUniqueInputSchema: z.ZodType<Prisma.HeightLogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => HeightLogWhereInputSchema),z.lazy(() => HeightLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HeightLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HeightLogWhereInputSchema),z.lazy(() => HeightLogWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  heightCm: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const HeightLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.HeightLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  heightCm: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HeightLogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HeightLogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HeightLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HeightLogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HeightLogSumOrderByAggregateInputSchema).optional()
}).strict();

export const HeightLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HeightLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HeightLogScalarWhereWithAggregatesInputSchema),z.lazy(() => HeightLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HeightLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HeightLogScalarWhereWithAggregatesInputSchema),z.lazy(() => HeightLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  heightCm: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WeightLogWhereInputSchema: z.ZodType<Prisma.WeightLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WeightLogWhereInputSchema),z.lazy(() => WeightLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeightLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeightLogWhereInputSchema),z.lazy(() => WeightLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weightKg: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const WeightLogOrderByWithRelationInputSchema: z.ZodType<Prisma.WeightLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weightKg: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WeightLogWhereUniqueInputSchema: z.ZodType<Prisma.WeightLogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WeightLogWhereInputSchema),z.lazy(() => WeightLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeightLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeightLogWhereInputSchema),z.lazy(() => WeightLogWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weightKg: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const WeightLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.WeightLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weightKg: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WeightLogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WeightLogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WeightLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WeightLogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WeightLogSumOrderByAggregateInputSchema).optional()
}).strict();

export const WeightLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WeightLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WeightLogScalarWhereWithAggregatesInputSchema),z.lazy(() => WeightLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeightLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeightLogScalarWhereWithAggregatesInputSchema),z.lazy(() => WeightLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  weightKg: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WorkoutPlanWhereInputSchema: z.ZodType<Prisma.WorkoutPlanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional(),
  workoutDays: z.lazy(() => WorkoutDayListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutPlanOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional(),
  workoutDays: z.lazy(() => WorkoutDayOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkoutPlanWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutPlanWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional(),
  workoutDays: z.lazy(() => WorkoutDayListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const WorkoutPlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutPlanOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutPlanCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutPlanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutPlanMinOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutPlanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutPlanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional()
}).strict();

export const WorkoutDayWhereInputSchema: z.ZodType<Prisma.WorkoutDayWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  plan: z.union([ z.lazy(() => WorkoutPlanScalarRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseListRelationFilterSchema).optional()
}).strict();

export const WorkoutDayOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutDayOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  plan: z.lazy(() => WorkoutPlanOrderByWithRelationInputSchema).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const WorkoutDayWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutDayWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  plan: z.union([ z.lazy(() => WorkoutPlanScalarRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseListRelationFilterSchema).optional()
}).strict());

export const WorkoutDayOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutDayOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutDayCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutDayAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutDayMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutDayMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutDaySumOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutDayScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutDayScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  planId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ExerciseWhereInputSchema: z.ZodType<Prisma.ExerciseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userDefined: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseListRelationFilterSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogListRelationFilterSchema).optional()
}).strict();

export const ExerciseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userDefined: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseOrderByRelationAggregateInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ExerciseWhereUniqueInputSchema: z.ZodType<Prisma.ExerciseWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userDefined: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseListRelationFilterSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogListRelationFilterSchema).optional()
}).strict());

export const ExerciseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userDefined: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExerciseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExerciseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExerciseMinOrderByAggregateInputSchema).optional()
}).strict();

export const ExerciseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExerciseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userDefined: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdById: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional()
}).strict();

export const WorkoutDayExerciseWhereInputSchema: z.ZodType<Prisma.WorkoutDayExerciseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayExerciseWhereInputSchema),z.lazy(() => WorkoutDayExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayExerciseWhereInputSchema),z.lazy(() => WorkoutDayExerciseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weights: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  restSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => WorkoutDayScalarRelationFilterSchema),z.lazy(() => WorkoutDayWhereInputSchema) ]).optional(),
  exercise: z.union([ z.lazy(() => ExerciseScalarRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutDayExerciseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dayId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => WorkoutDayOrderByWithRelationInputSchema).optional(),
  exercise: z.lazy(() => ExerciseOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkoutDayExerciseWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutDayExerciseWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkoutDayExerciseWhereInputSchema),z.lazy(() => WorkoutDayExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayExerciseWhereInputSchema),z.lazy(() => WorkoutDayExerciseWhereInputSchema).array() ]).optional(),
  dayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  weights: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  restSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  day: z.union([ z.lazy(() => WorkoutDayScalarRelationFilterSchema),z.lazy(() => WorkoutDayWhereInputSchema) ]).optional(),
  exercise: z.union([ z.lazy(() => ExerciseScalarRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
}).strict());

export const WorkoutDayExerciseOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutDayExerciseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dayId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutDayExerciseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutDayExerciseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutDayExerciseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutDayExerciseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutDayExerciseSumOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutDayExerciseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutDayExerciseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayExerciseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dayId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  sets: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  weights: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  restSeconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const WorkoutLogWhereInputSchema: z.ZodType<Prisma.WorkoutLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutLogWhereInputSchema),z.lazy(() => WorkoutLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutLogWhereInputSchema),z.lazy(() => WorkoutLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  setsCompleted: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  repsPerSet: z.lazy(() => IntNullableListFilterSchema).optional(),
  weightPerSet: z.lazy(() => FloatNullableListFilterSchema).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exercise: z.union([ z.lazy(() => ExerciseScalarRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const WorkoutLogOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  performedAt: z.lazy(() => SortOrderSchema).optional(),
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  repsPerSet: z.lazy(() => SortOrderSchema).optional(),
  weightPerSet: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkoutLogWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutLogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkoutLogWhereInputSchema),z.lazy(() => WorkoutLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutLogWhereInputSchema),z.lazy(() => WorkoutLogWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  setsCompleted: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  repsPerSet: z.lazy(() => IntNullableListFilterSchema).optional(),
  weightPerSet: z.lazy(() => FloatNullableListFilterSchema).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exercise: z.union([ z.lazy(() => ExerciseScalarRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const WorkoutLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  performedAt: z.lazy(() => SortOrderSchema).optional(),
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  repsPerSet: z.lazy(() => SortOrderSchema).optional(),
  weightPerSet: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WorkoutLogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutLogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutLogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutLogSumOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutLogScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutLogScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  performedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  setsCompleted: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  repsPerSet: z.lazy(() => IntNullableListFilterSchema).optional(),
  weightPerSet: z.lazy(() => FloatNullableListFilterSchema).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthenticatorCreateInputSchema: z.ZodType<Prisma.AuthenticatorCreateInput> = z.object({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthenticatorsInputSchema)
}).strict();

export const AuthenticatorUncheckedCreateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateInput> = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable()
}).strict();

export const AuthenticatorUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUpdateInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema).optional()
}).strict();

export const AuthenticatorUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthenticatorCreateManyInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyInput> = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable()
}).strict();

export const AuthenticatorUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyMutationInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthenticatorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HeightLogCreateInputSchema: z.ZodType<Prisma.HeightLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutHeightLogsInputSchema)
}).strict();

export const HeightLogUncheckedCreateInputSchema: z.ZodType<Prisma.HeightLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const HeightLogUpdateInputSchema: z.ZodType<Prisma.HeightLogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHeightLogsNestedInputSchema).optional()
}).strict();

export const HeightLogUncheckedUpdateInputSchema: z.ZodType<Prisma.HeightLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HeightLogCreateManyInputSchema: z.ZodType<Prisma.HeightLogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const HeightLogUpdateManyMutationInputSchema: z.ZodType<Prisma.HeightLogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HeightLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HeightLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogCreateInputSchema: z.ZodType<Prisma.WeightLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWeightLogsInputSchema)
}).strict();

export const WeightLogUncheckedCreateInputSchema: z.ZodType<Prisma.WeightLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const WeightLogUpdateInputSchema: z.ZodType<Prisma.WeightLogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWeightLogsNestedInputSchema).optional()
}).strict();

export const WeightLogUncheckedUpdateInputSchema: z.ZodType<Prisma.WeightLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogCreateManyInputSchema: z.ZodType<Prisma.WeightLogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const WeightLogUpdateManyMutationInputSchema: z.ZodType<Prisma.WeightLogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WeightLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanCreateInputSchema: z.ZodType<Prisma.WorkoutPlanCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayCreateNestedManyWithoutPlanInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkoutPlansInputSchema)
}).strict();

export const WorkoutPlanUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanUpdateInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUpdateManyWithoutPlanNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkoutPlansNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanCreateManyInputSchema: z.ZodType<Prisma.WorkoutPlanCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutDayCreateInputSchema: z.ZodType<Prisma.WorkoutDayCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  dayOfWeek: z.number().int(),
  plan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutWorkoutDaysInputSchema),
  exercises: z.lazy(() => WorkoutDayExerciseCreateNestedManyWithoutDayInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  planId: z.string(),
  name: z.string().optional(),
  dayOfWeek: z.number().int(),
  exercises: z.lazy(() => WorkoutDayExerciseUncheckedCreateNestedManyWithoutDayInputSchema).optional()
}).strict();

export const WorkoutDayUpdateInputSchema: z.ZodType<Prisma.WorkoutDayUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => WorkoutPlanUpdateOneRequiredWithoutWorkoutDaysNestedInputSchema).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseUpdateManyWithoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayCreateManyInputSchema: z.ZodType<Prisma.WorkoutDayCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  planId: z.string(),
  name: z.string().optional(),
  dayOfWeek: z.number().int()
}).strict();

export const WorkoutDayUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateInputSchema: z.ZodType<Prisma.ExerciseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedExercisesInputSchema).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseCreateNestedManyWithoutExerciseInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  createdById: z.string().optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUpdateInputSchema: z.ZodType<Prisma.ExerciseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedExercisesNestedInputSchema).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUpdateManyWithoutExerciseNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseCreateManyInputSchema: z.ZodType<Prisma.ExerciseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  createdById: z.string().optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdateManyMutationInputSchema: z.ZodType<Prisma.ExerciseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseCreateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int(),
  day: z.lazy(() => WorkoutDayCreateNestedOneWithoutExercisesInputSchema),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutWorkoutDayLinksInputSchema)
}).strict();

export const WorkoutDayExerciseUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  dayId: z.string(),
  exerciseId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutDayExerciseUpdateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.lazy(() => WorkoutDayUpdateOneRequiredWithoutExercisesNestedInputSchema).optional(),
  exercise: z.lazy(() => ExerciseUpdateOneRequiredWithoutWorkoutDayLinksNestedInputSchema).optional()
}).strict();

export const WorkoutDayExerciseUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseCreateManyInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  dayId: z.string(),
  exerciseId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutDayExerciseUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutLogCreateInputSchema: z.ZodType<Prisma.WorkoutLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutWorkoutLogsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkoutLogsInputSchema)
}).strict();

export const WorkoutLogUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  exerciseId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutLogUpdateInputSchema: z.ZodType<Prisma.WorkoutLogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exercise: z.lazy(() => ExerciseUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema).optional()
}).strict();

export const WorkoutLogUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WorkoutLogCreateManyInputSchema: z.ZodType<Prisma.WorkoutLogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  exerciseId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutLogUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutLogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WorkoutLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AuthenticatorListRelationFilterSchema: z.ZodType<Prisma.AuthenticatorListRelationFilter> = z.object({
  every: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
  some: z.lazy(() => AuthenticatorWhereInputSchema).optional(),
  none: z.lazy(() => AuthenticatorWhereInputSchema).optional()
}).strict();

export const ExerciseListRelationFilterSchema: z.ZodType<Prisma.ExerciseListRelationFilter> = z.object({
  every: z.lazy(() => ExerciseWhereInputSchema).optional(),
  some: z.lazy(() => ExerciseWhereInputSchema).optional(),
  none: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const HeightLogListRelationFilterSchema: z.ZodType<Prisma.HeightLogListRelationFilter> = z.object({
  every: z.lazy(() => HeightLogWhereInputSchema).optional(),
  some: z.lazy(() => HeightLogWhereInputSchema).optional(),
  none: z.lazy(() => HeightLogWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const WeightLogListRelationFilterSchema: z.ZodType<Prisma.WeightLogListRelationFilter> = z.object({
  every: z.lazy(() => WeightLogWhereInputSchema).optional(),
  some: z.lazy(() => WeightLogWhereInputSchema).optional(),
  none: z.lazy(() => WeightLogWhereInputSchema).optional()
}).strict();

export const WorkoutLogListRelationFilterSchema: z.ZodType<Prisma.WorkoutLogListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutLogWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutLogWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutLogWhereInputSchema).optional()
}).strict();

export const WorkoutPlanListRelationFilterSchema: z.ZodType<Prisma.WorkoutPlanListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthenticatorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuthenticatorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExerciseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HeightLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HeightLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeightLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WeightLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AuthenticatorUserIdCredentialIDCompoundUniqueInputSchema: z.ZodType<Prisma.AuthenticatorUserIdCredentialIDCompoundUniqueInput> = z.object({
  userId: z.string(),
  credentialID: z.string()
}).strict();

export const AuthenticatorCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorCountOrderByAggregateInput> = z.object({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthenticatorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorAvgOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthenticatorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMaxOrderByAggregateInput> = z.object({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthenticatorMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorMinOrderByAggregateInput> = z.object({
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  credentialPublicKey: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  credentialDeviceType: z.lazy(() => SortOrderSchema).optional(),
  credentialBackedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthenticatorSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuthenticatorSumOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const HeightLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.HeightLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  heightCm: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HeightLogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HeightLogAvgOrderByAggregateInput> = z.object({
  heightCm: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HeightLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HeightLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  heightCm: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HeightLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.HeightLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  heightCm: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HeightLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.HeightLogSumOrderByAggregateInput> = z.object({
  heightCm: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const WeightLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.WeightLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weightKg: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeightLogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WeightLogAvgOrderByAggregateInput> = z.object({
  weightKg: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeightLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WeightLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weightKg: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeightLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.WeightLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weightKg: z.lazy(() => SortOrderSchema).optional(),
  recordedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeightLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.WeightLogSumOrderByAggregateInput> = z.object({
  weightKg: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMuscleGroupNullableListFilterSchema: z.ZodType<Prisma.EnumMuscleGroupNullableListFilter> = z.object({
  equals: z.lazy(() => MuscleGroupSchema).array().optional().nullable(),
  has: z.lazy(() => MuscleGroupSchema).optional().nullable(),
  hasEvery: z.lazy(() => MuscleGroupSchema).array().optional(),
  hasSome: z.lazy(() => MuscleGroupSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const WorkoutDayListRelationFilterSchema: z.ZodType<Prisma.WorkoutDayListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const WorkoutDayOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutDayOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanScalarRelationFilterSchema: z.ZodType<Prisma.WorkoutPlanScalarRelationFilter> = z.object({
  is: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const WorkoutDayExerciseListRelationFilterSchema: z.ZodType<Prisma.WorkoutDayExerciseListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutDayExerciseWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutDayExerciseWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutDayExerciseWhereInputSchema).optional()
}).strict();

export const WorkoutDayExerciseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayAvgOrderByAggregateInput> = z.object({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDaySumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDaySumOrderByAggregateInput> = z.object({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ExerciseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userDefined: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  muscleGroups: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userDefined: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userDefined: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayScalarRelationFilterSchema: z.ZodType<Prisma.WorkoutDayScalarRelationFilter> = z.object({
  is: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const ExerciseScalarRelationFilterSchema: z.ZodType<Prisma.ExerciseScalarRelationFilter> = z.object({
  is: z.lazy(() => ExerciseWhereInputSchema).optional(),
  isNot: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const WorkoutDayExerciseCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dayId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayExerciseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayExerciseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dayId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayExerciseMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dayId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayExerciseSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayExerciseSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  weights: z.lazy(() => SortOrderSchema).optional(),
  restSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableListFilterSchema: z.ZodType<Prisma.IntNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const FloatNullableListFilterSchema: z.ZodType<Prisma.FloatNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const WorkoutLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  performedAt: z.lazy(() => SortOrderSchema).optional(),
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  repsPerSet: z.lazy(() => SortOrderSchema).optional(),
  weightPerSet: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutLogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutLogAvgOrderByAggregateInput> = z.object({
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  repsPerSet: z.lazy(() => SortOrderSchema).optional(),
  weightPerSet: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  performedAt: z.lazy(() => SortOrderSchema).optional(),
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  exerciseId: z.lazy(() => SortOrderSchema).optional(),
  performedAt: z.lazy(() => SortOrderSchema).optional(),
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutLogSumOrderByAggregateInput> = z.object({
  setsCompleted: z.lazy(() => SortOrderSchema).optional(),
  repsPerSet: z.lazy(() => SortOrderSchema).optional(),
  weightPerSet: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuthenticatorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HeightLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HeightLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HeightLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WeightLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WeightLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeightLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutPlanCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HeightLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HeightLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WeightLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeightLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutPlanCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthenticatorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema),z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExerciseUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HeightLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HeightLogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HeightLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HeightLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HeightLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HeightLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HeightLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HeightLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HeightLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HeightLogScalarWhereInputSchema),z.lazy(() => HeightLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WeightLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WeightLogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WeightLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WeightLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeightLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WeightLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WeightLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WeightLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WeightLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WeightLogScalarWhereInputSchema),z.lazy(() => WeightLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkoutLogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutPlanUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutPlanCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutPlanUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutPlanScalarWhereInputSchema),z.lazy(() => WorkoutPlanScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateWithoutUserInputSchema).array(),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuthenticatorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthenticatorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthenticatorWhereUniqueInputSchema),z.lazy(() => AuthenticatorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuthenticatorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema),z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExerciseUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => ExerciseUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HeightLogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => HeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HeightLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HeightLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HeightLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HeightLogWhereUniqueInputSchema),z.lazy(() => HeightLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HeightLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HeightLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HeightLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HeightLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HeightLogScalarWhereInputSchema),z.lazy(() => HeightLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WeightLogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogCreateWithoutUserInputSchema).array(),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WeightLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WeightLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WeightLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeightLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeightLogWhereUniqueInputSchema),z.lazy(() => WeightLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WeightLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WeightLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WeightLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WeightLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WeightLogScalarWhereInputSchema),z.lazy(() => WeightLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema).array(),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkoutPlanCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutPlanUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutPlanCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutPlanWhereUniqueInputSchema),z.lazy(() => WorkoutPlanWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutPlanUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkoutPlanUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutPlanScalarWhereInputSchema),z.lazy(() => WorkoutPlanScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthenticatorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAuthenticatorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthenticatorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthenticatorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuthenticatorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema),z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHeightLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHeightLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHeightLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutHeightLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHeightLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHeightLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHeightLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHeightLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHeightLogsInputSchema),z.lazy(() => UserUpdateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHeightLogsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWeightLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWeightLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWeightLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutWeightLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWeightLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWeightLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWeightLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWeightLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWeightLogsInputSchema),z.lazy(() => UserUpdateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWeightLogsInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanCreatemuscleGroupsInputSchema: z.ZodType<Prisma.WorkoutPlanCreatemuscleGroupsInput> = z.object({
  set: z.lazy(() => MuscleGroupSchema).array()
}).strict();

export const WorkoutDayCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkoutPlansInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutPlansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkoutPlansInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUpdatemuscleGroupsInputSchema: z.ZodType<Prisma.WorkoutPlanUpdatemuscleGroupsInput> = z.object({
  set: z.lazy(() => MuscleGroupSchema).array().optional(),
  push: z.union([ z.lazy(() => MuscleGroupSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutDayUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutWorkoutPlansNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkoutPlansNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutPlansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkoutPlansInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWorkoutPlansInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWorkoutPlansInputSchema),z.lazy(() => UserUpdateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutPlansInputSchema) ]).optional(),
}).strict();

export const WorkoutDayUncheckedUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanCreateNestedOneWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanCreateNestedOneWithoutWorkoutDaysInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutWorkoutDaysInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayExerciseCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateNestedManyWithoutDayInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedCreateNestedManyWithoutDayInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUpdateOneRequiredWithoutWorkoutDaysNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateOneRequiredWithoutWorkoutDaysNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutWorkoutDaysInputSchema).optional(),
  upsert: z.lazy(() => WorkoutPlanUpsertWithoutWorkoutDaysInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateToOneWithWhereWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUpdateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutDaysInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyWithoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateManyWithoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExerciseCreatemuscleGroupsInputSchema: z.ZodType<Prisma.ExerciseCreatemuscleGroupsInput> = z.object({
  set: z.lazy(() => MuscleGroupSchema).array()
}).strict();

export const UserCreateNestedOneWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedExercisesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedExercisesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayExerciseCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUncheckedCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdatemuscleGroupsInputSchema: z.ZodType<Prisma.ExerciseUpdatemuscleGroupsInput> = z.object({
  set: z.lazy(() => MuscleGroupSchema).array().optional(),
  push: z.union([ z.lazy(() => MuscleGroupSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutCreatedExercisesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCreatedExercisesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedExercisesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedExercisesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedExercisesInputSchema),z.lazy(() => UserUpdateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedExercisesInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.WorkoutLogUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutLogUncheckedUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema).array(),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => WorkoutLogCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutLogCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutLogWhereUniqueInputSchema),z.lazy(() => WorkoutLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayCreateNestedOneWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateNestedOneWithoutExercisesInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutDayCreateOrConnectWithoutExercisesInputSchema).optional(),
  connect: z.lazy(() => WorkoutDayWhereUniqueInputSchema).optional()
}).strict();

export const ExerciseCreateNestedOneWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutWorkoutDayLinksInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayLinksInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayUpdateOneRequiredWithoutExercisesNestedInputSchema: z.ZodType<Prisma.WorkoutDayUpdateOneRequiredWithoutExercisesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutDayCreateOrConnectWithoutExercisesInputSchema).optional(),
  upsert: z.lazy(() => WorkoutDayUpsertWithoutExercisesInputSchema).optional(),
  connect: z.lazy(() => WorkoutDayWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateToOneWithWhereWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]).optional(),
}).strict();

export const ExerciseUpdateOneRequiredWithoutWorkoutDayLinksNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateOneRequiredWithoutWorkoutDayLinksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayLinksInputSchema).optional(),
  upsert: z.lazy(() => ExerciseUpsertWithoutWorkoutDayLinksInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateToOneWithWhereWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUpdateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutDayLinksInputSchema) ]).optional(),
}).strict();

export const WorkoutLogCreaterepsPerSetInputSchema: z.ZodType<Prisma.WorkoutLogCreaterepsPerSetInput> = z.object({
  set: z.number().array()
}).strict();

export const WorkoutLogCreateweightPerSetInputSchema: z.ZodType<Prisma.WorkoutLogCreateweightPerSetInput> = z.object({
  set: z.number().array()
}).strict();

export const ExerciseCreateNestedOneWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutWorkoutLogsInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutLogsInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkoutLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkoutLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutLogUpdaterepsPerSetInputSchema: z.ZodType<Prisma.WorkoutLogUpdaterepsPerSetInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const WorkoutLogUpdateweightPerSetInputSchema: z.ZodType<Prisma.WorkoutLogUpdateweightPerSetInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const ExerciseUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateOneRequiredWithoutWorkoutLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutLogsInputSchema).optional(),
  upsert: z.lazy(() => ExerciseUpsertWithoutWorkoutLogsInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateToOneWithWhereWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutLogsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkoutLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkoutLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWorkoutLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWorkoutLogsInputSchema),z.lazy(() => UserUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutLogsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuthenticatorCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateWithoutUserInput> = z.object({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable()
}).strict();

export const AuthenticatorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedCreateWithoutUserInput> = z.object({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable()
}).strict();

export const AuthenticatorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuthenticatorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuthenticatorCreateManyUserInputSchema),z.lazy(() => AuthenticatorCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExerciseCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseCreateNestedManyWithoutExerciseInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const ExerciseCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.ExerciseCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExerciseCreateManyCreatedByInputSchema),z.lazy(() => ExerciseCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HeightLogCreateWithoutUserInputSchema: z.ZodType<Prisma.HeightLogCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const HeightLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const HeightLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HeightLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => HeightLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HeightLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HeightLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HeightLogCreateManyUserInputSchema),z.lazy(() => HeightLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WeightLogCreateWithoutUserInputSchema: z.ZodType<Prisma.WeightLogCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const WeightLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const WeightLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WeightLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WeightLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WeightLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WeightLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WeightLogCreateManyUserInputSchema),z.lazy(() => WeightLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkoutLogCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutWorkoutLogsInputSchema)
}).strict();

export const WorkoutLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  exerciseId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WorkoutLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutLogCreateManyUserInputSchema),z.lazy(() => WorkoutLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkoutPlanCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutPlanCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WorkoutPlanCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutPlanCreateManyUserInputSchema),z.lazy(() => WorkoutPlanCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuthenticatorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuthenticatorCreateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuthenticatorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuthenticatorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuthenticatorUpdateWithoutUserInputSchema),z.lazy(() => AuthenticatorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AuthenticatorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AuthenticatorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuthenticatorUpdateManyMutationInputSchema),z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AuthenticatorScalarWhereInputSchema: z.ZodType<Prisma.AuthenticatorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema),z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthenticatorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthenticatorScalarWhereInputSchema),z.lazy(() => AuthenticatorScalarWhereInputSchema).array() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialPublicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  credentialDeviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialBackedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ExerciseUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const ExerciseUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutCreatedByInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const ExerciseUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateManyMutationInputSchema),z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const ExerciseScalarWhereInputSchema: z.ZodType<Prisma.ExerciseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userDefined: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional()
}).strict();

export const HeightLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HeightLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HeightLogUpdateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HeightLogCreateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HeightLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HeightLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HeightLogUpdateWithoutUserInputSchema),z.lazy(() => HeightLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const HeightLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => HeightLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HeightLogUpdateManyMutationInputSchema),z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const HeightLogScalarWhereInputSchema: z.ZodType<Prisma.HeightLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HeightLogScalarWhereInputSchema),z.lazy(() => HeightLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HeightLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HeightLogScalarWhereInputSchema),z.lazy(() => HeightLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  heightCm: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WeightLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WeightLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WeightLogUpdateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WeightLogCreateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WeightLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WeightLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WeightLogUpdateWithoutUserInputSchema),z.lazy(() => WeightLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WeightLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WeightLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WeightLogUpdateManyMutationInputSchema),z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WeightLogScalarWhereInputSchema: z.ZodType<Prisma.WeightLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WeightLogScalarWhereInputSchema),z.lazy(() => WeightLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeightLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeightLogScalarWhereInputSchema),z.lazy(() => WeightLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weightKg: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recordedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WorkoutLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutLogUpdateWithoutUserInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutLogUpdateManyMutationInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WorkoutLogScalarWhereInputSchema: z.ZodType<Prisma.WorkoutLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutLogScalarWhereInputSchema),z.lazy(() => WorkoutLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  setsCompleted: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  repsPerSet: z.lazy(() => IntNullableListFilterSchema).optional(),
  weightPerSet: z.lazy(() => FloatNullableListFilterSchema).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const WorkoutPlanUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutPlanUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutUserInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WorkoutPlanUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WorkoutPlanScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutPlanUpdateManyMutationInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WorkoutPlanScalarWhereInputSchema: z.ZodType<Prisma.WorkoutPlanScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutPlanScalarWhereInputSchema),z.lazy(() => WorkoutPlanScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanScalarWhereInputSchema),z.lazy(() => WorkoutPlanScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  muscleGroups: z.lazy(() => EnumMuscleGroupNullableListFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthenticatorsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthenticatorsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthenticatorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthenticatorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthenticatorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthenticatorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuthenticatorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthenticatorsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthenticatorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuthenticatorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthenticatorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutHeightLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHeightLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHeightLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHeightLogsInputSchema) ]),
}).strict();

export const UserUpsertWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutHeightLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHeightLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHeightLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHeightLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHeightLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutHeightLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHeightLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHeightLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutWeightLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWeightLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWeightLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWeightLogsInputSchema) ]),
}).strict();

export const UserUpsertWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutWeightLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWeightLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWeightLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWeightLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWeightLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWeightLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutWeightLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWeightLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWeightLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const WorkoutDayCreateWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateWithoutPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  dayOfWeek: z.number().int(),
  exercises: z.lazy(() => WorkoutDayExerciseCreateNestedManyWithoutDayInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateWithoutPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  dayOfWeek: z.number().int(),
  exercises: z.lazy(() => WorkoutDayExerciseUncheckedCreateNestedManyWithoutDayInputSchema).optional()
}).strict();

export const WorkoutDayCreateOrConnectWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateOrConnectWithoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayCreateManyPlanInputEnvelopeSchema: z.ZodType<Prisma.WorkoutDayCreateManyPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutDayCreateManyPlanInputSchema),z.lazy(() => WorkoutDayCreateManyPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkoutPlansInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkoutPlansInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkoutPlansInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutPlansInputSchema) ]),
}).strict();

export const WorkoutDayUpsertWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpsertWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayUpdateWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayUpdateWithoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayUpdateManyWithWhereWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyWithWhereWithoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayUpdateManyMutationInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayScalarWhereInputSchema: z.ZodType<Prisma.WorkoutDayScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserUpsertWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkoutPlansInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutPlansInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutPlansInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkoutPlansInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWorkoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutPlansInputSchema) ]),
}).strict();

export const UserUpdateWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkoutPlansInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWorkoutPlansInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkoutPlansInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const WorkoutPlanCreateWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanCreateWithoutWorkoutDaysInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkoutPlansInputSchema)
}).strict();

export const WorkoutPlanUncheckedCreateWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateWithoutWorkoutDaysInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanCreateOrConnectWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanCreateOrConnectWithoutWorkoutDaysInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutDaysInputSchema) ]),
}).strict();

export const WorkoutDayExerciseCreateWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateWithoutDayInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutWorkoutDayLinksInputSchema)
}).strict();

export const WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedCreateWithoutDayInput> = z.object({
  id: z.string().cuid().optional(),
  exerciseId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutDayExerciseCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateOrConnectWithoutDayInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export const WorkoutDayExerciseCreateManyDayInputEnvelopeSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyDayInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutDayExerciseCreateManyDayInputSchema),z.lazy(() => WorkoutDayExerciseCreateManyDayInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkoutPlanUpsertWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanUpsertWithoutWorkoutDaysInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutDaysInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutDaysInputSchema) ]),
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const WorkoutPlanUpdateToOneWithWhereWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateToOneWithWhereWithoutWorkoutDaysInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutWorkoutDaysInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutDaysInputSchema) ]),
}).strict();

export const WorkoutPlanUpdateWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateWithoutWorkoutDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkoutPlansNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateWithoutWorkoutDaysInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateWithoutWorkoutDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpsertWithWhereUniqueWithoutDayInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateWithoutDayInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export const WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateWithWhereUniqueWithoutDayInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithoutDayInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateWithoutDayInputSchema) ]),
}).strict();

export const WorkoutDayExerciseUpdateManyWithWhereWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyWithWhereWithoutDayInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyMutationInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutDayInputSchema) ]),
}).strict();

export const WorkoutDayExerciseScalarWhereInputSchema: z.ZodType<Prisma.WorkoutDayExerciseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weights: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  restSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedExercisesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedExercisesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedExercisesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedExercisesInputSchema) ]),
}).strict();

export const WorkoutDayExerciseCreateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateWithoutExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int(),
  day: z.lazy(() => WorkoutDayCreateNestedOneWithoutExercisesInputSchema)
}).strict();

export const WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedCreateWithoutExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  dayId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutDayExerciseCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutDayExerciseCreateManyExerciseInputEnvelopeSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputSchema),z.lazy(() => WorkoutDayExerciseCreateManyExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkoutLogCreateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogCreateWithoutExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkoutLogsInputSchema)
}).strict();

export const WorkoutLogUncheckedCreateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedCreateWithoutExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutLogCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutLogCreateManyExerciseInputEnvelopeSchema: z.ZodType<Prisma.WorkoutLogCreateManyExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutLogCreateManyExerciseInputSchema),z.lazy(() => WorkoutLogCreateManyExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedExercisesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedExercisesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedExercisesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedExercisesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedExercisesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedExercisesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedExercisesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedExercisesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedExercisesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpsertWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayExerciseCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayExerciseUpdateWithoutExerciseInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutDayExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayExerciseUpdateManyMutationInputSchema),z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutLogUpsertWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUpsertWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutLogUpdateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutLogCreateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutLogUpdateWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUpdateWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutLogUpdateWithoutExerciseInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutLogUpdateManyWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUpdateManyWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => WorkoutLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutLogUpdateManyMutationInputSchema),z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutExerciseInputSchema) ]),
}).strict();

export const WorkoutDayCreateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateWithoutExercisesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  dayOfWeek: z.number().int(),
  plan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutWorkoutDaysInputSchema)
}).strict();

export const WorkoutDayUncheckedCreateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateWithoutExercisesInput> = z.object({
  id: z.string().cuid().optional(),
  planId: z.string(),
  name: z.string().optional(),
  dayOfWeek: z.number().int()
}).strict();

export const WorkoutDayCreateOrConnectWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateOrConnectWithoutExercisesInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]),
}).strict();

export const ExerciseCreateWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseCreateWithoutWorkoutDayLinksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedExercisesInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateWithoutWorkoutDayLinksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  createdById: z.string().optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseCreateOrConnectWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutWorkoutDayLinksInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayLinksInputSchema) ]),
}).strict();

export const WorkoutDayUpsertWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpsertWithoutExercisesInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]),
  where: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const WorkoutDayUpdateToOneWithWhereWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpdateToOneWithWhereWithoutExercisesInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]),
}).strict();

export const WorkoutDayUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithoutExercisesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => WorkoutPlanUpdateOneRequiredWithoutWorkoutDaysNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateWithoutExercisesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseUpsertWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseUpsertWithoutWorkoutDayLinksInput> = z.object({
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutDayLinksInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayLinksInputSchema) ]),
  where: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const ExerciseUpdateToOneWithWhereWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseUpdateToOneWithWhereWithoutWorkoutDayLinksInput> = z.object({
  where: z.lazy(() => ExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutDayLinksInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutDayLinksInputSchema) ]),
}).strict();

export const ExerciseUpdateWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseUpdateWithoutWorkoutDayLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedExercisesNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateWithoutWorkoutDayLinksInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateWithoutWorkoutDayLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseCreateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseCreateWithoutWorkoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedExercisesInputSchema).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateWithoutWorkoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  createdById: z.string().optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseCreateOrConnectWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutWorkoutLogsInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutLogsInputSchema) ]),
}).strict();

export const UserCreateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkoutLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutLogsInputSchema) ]),
}).strict();

export const ExerciseUpsertWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseUpsertWithoutWorkoutLogsInput> = z.object({
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutLogsInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutLogsInputSchema) ]),
  where: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const ExerciseUpdateToOneWithWhereWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseUpdateToOneWithWhereWithoutWorkoutLogsInput> = z.object({
  where: z.lazy(() => ExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutLogsInputSchema) ]),
}).strict();

export const ExerciseUpdateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseUpdateWithoutWorkoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedExercisesNestedInputSchema).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateWithoutWorkoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkoutLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkoutLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkoutLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWorkoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkoutLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWorkoutLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  providerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Authenticators: z.lazy(() => AuthenticatorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdExercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  heightLogs: z.lazy(() => HeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  weightLogs: z.lazy(() => WeightLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workoutPlans: z.lazy(() => WorkoutPlanUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AuthenticatorCreateManyUserInputSchema: z.ZodType<Prisma.AuthenticatorCreateManyUserInput> = z.object({
  credentialID: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().optional().nullable()
}).strict();

export const ExerciseCreateManyCreatedByInputSchema: z.ZodType<Prisma.ExerciseCreateManyCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userDefined: z.boolean().optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const HeightLogCreateManyUserInputSchema: z.ZodType<Prisma.HeightLogCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  heightCm: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WeightLogCreateManyUserInputSchema: z.ZodType<Prisma.WeightLogCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  weightKg: z.number(),
  recordedAt: z.coerce.date().optional()
}).strict();

export const WorkoutLogCreateManyUserInputSchema: z.ZodType<Prisma.WorkoutLogCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  exerciseId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutPlanCreateManyUserInputSchema: z.ZodType<Prisma.WorkoutPlanCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanCreatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthenticatorUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUpdateWithoutUserInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthenticatorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateWithoutUserInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthenticatorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuthenticatorUncheckedUpdateManyWithoutUserInput> = z.object({
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialPublicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  credentialDeviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialBackedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExerciseUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUpdateManyWithoutExerciseNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDayLinks: z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional(),
  workoutLogs: z.lazy(() => WorkoutLogUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userDefined: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => ExerciseUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const HeightLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HeightLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HeightLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.HeightLogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  heightCm: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeightLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WeightLogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weightKg: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recordedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exercise: z.lazy(() => ExerciseUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema).optional()
}).strict();

export const WorkoutLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WorkoutLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WorkoutPlanUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
  workoutDays: z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  muscleGroups: z.union([ z.lazy(() => WorkoutPlanUpdatemuscleGroupsInputSchema),z.lazy(() => MuscleGroupSchema).array() ]).optional(),
}).strict();

export const WorkoutDayCreateManyPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateManyPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  dayOfWeek: z.number().int()
}).strict();

export const WorkoutDayUpdateWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseUpdateManyWithoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => WorkoutDayExerciseUncheckedUpdateManyWithoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseCreateManyDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyDayInput> = z.object({
  id: z.string().cuid().optional(),
  exerciseId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutDayExerciseUpdateWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateWithoutDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseUpdateOneRequiredWithoutWorkoutDayLinksNestedInputSchema).optional()
}).strict();

export const WorkoutDayExerciseUncheckedUpdateWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateWithoutDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedUpdateManyWithoutDayInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateManyWithoutDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseCreateManyExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  dayId: z.string(),
  order: z.number().int(),
  sets: z.number().int(),
  reps: z.number().int(),
  weights: z.number().optional(),
  restSeconds: z.number().int()
}).strict();

export const WorkoutLogCreateManyExerciseInputSchema: z.ZodType<Prisma.WorkoutLogCreateManyExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  performedAt: z.coerce.date().optional(),
  setsCompleted: z.number().int(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogCreaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogCreateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.string().optional().nullable()
}).strict();

export const WorkoutDayExerciseUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.lazy(() => WorkoutDayUpdateOneRequiredWithoutExercisesNestedInputSchema).optional()
}).strict();

export const WorkoutDayExerciseUncheckedUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutDayExerciseUncheckedUpdateManyWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weights: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  restSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutLogUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkoutLogsNestedInputSchema).optional()
}).strict();

export const WorkoutLogUncheckedUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WorkoutLogUncheckedUpdateManyWithoutExerciseInputSchema: z.ZodType<Prisma.WorkoutLogUncheckedUpdateManyWithoutExerciseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  setsCompleted: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  repsPerSet: z.union([ z.lazy(() => WorkoutLogUpdaterepsPerSetInputSchema),z.number().int().array() ]).optional(),
  weightPerSet: z.union([ z.lazy(() => WorkoutLogUpdateweightPerSetInputSchema),z.number().array() ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const AuthenticatorFindFirstArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(),
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(),AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema,AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthenticatorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindFirstOrThrowArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(),
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(),AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema,AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthenticatorFindManyArgsSchema: z.ZodType<Prisma.AuthenticatorFindManyArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereInputSchema.optional(),
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(),AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthenticatorScalarFieldEnumSchema,AuthenticatorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthenticatorAggregateArgsSchema: z.ZodType<Prisma.AuthenticatorAggregateArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(),
  orderBy: z.union([ AuthenticatorOrderByWithRelationInputSchema.array(),AuthenticatorOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthenticatorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthenticatorGroupByArgsSchema: z.ZodType<Prisma.AuthenticatorGroupByArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(),
  orderBy: z.union([ AuthenticatorOrderByWithAggregationInputSchema.array(),AuthenticatorOrderByWithAggregationInputSchema ]).optional(),
  by: AuthenticatorScalarFieldEnumSchema.array(),
  having: AuthenticatorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthenticatorFindUniqueArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema,
}).strict() ;

export const AuthenticatorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthenticatorFindUniqueOrThrowArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema,
}).strict() ;

export const HeightLogFindFirstArgsSchema: z.ZodType<Prisma.HeightLogFindFirstArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereInputSchema.optional(),
  orderBy: z.union([ HeightLogOrderByWithRelationInputSchema.array(),HeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: HeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HeightLogScalarFieldEnumSchema,HeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HeightLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HeightLogFindFirstOrThrowArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereInputSchema.optional(),
  orderBy: z.union([ HeightLogOrderByWithRelationInputSchema.array(),HeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: HeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HeightLogScalarFieldEnumSchema,HeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HeightLogFindManyArgsSchema: z.ZodType<Prisma.HeightLogFindManyArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereInputSchema.optional(),
  orderBy: z.union([ HeightLogOrderByWithRelationInputSchema.array(),HeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: HeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HeightLogScalarFieldEnumSchema,HeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HeightLogAggregateArgsSchema: z.ZodType<Prisma.HeightLogAggregateArgs> = z.object({
  where: HeightLogWhereInputSchema.optional(),
  orderBy: z.union([ HeightLogOrderByWithRelationInputSchema.array(),HeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: HeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HeightLogGroupByArgsSchema: z.ZodType<Prisma.HeightLogGroupByArgs> = z.object({
  where: HeightLogWhereInputSchema.optional(),
  orderBy: z.union([ HeightLogOrderByWithAggregationInputSchema.array(),HeightLogOrderByWithAggregationInputSchema ]).optional(),
  by: HeightLogScalarFieldEnumSchema.array(),
  having: HeightLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HeightLogFindUniqueArgsSchema: z.ZodType<Prisma.HeightLogFindUniqueArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereUniqueInputSchema,
}).strict() ;

export const HeightLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HeightLogFindUniqueOrThrowArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereUniqueInputSchema,
}).strict() ;

export const WeightLogFindFirstArgsSchema: z.ZodType<Prisma.WeightLogFindFirstArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereInputSchema.optional(),
  orderBy: z.union([ WeightLogOrderByWithRelationInputSchema.array(),WeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeightLogScalarFieldEnumSchema,WeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeightLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WeightLogFindFirstOrThrowArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereInputSchema.optional(),
  orderBy: z.union([ WeightLogOrderByWithRelationInputSchema.array(),WeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeightLogScalarFieldEnumSchema,WeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeightLogFindManyArgsSchema: z.ZodType<Prisma.WeightLogFindManyArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereInputSchema.optional(),
  orderBy: z.union([ WeightLogOrderByWithRelationInputSchema.array(),WeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeightLogScalarFieldEnumSchema,WeightLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeightLogAggregateArgsSchema: z.ZodType<Prisma.WeightLogAggregateArgs> = z.object({
  where: WeightLogWhereInputSchema.optional(),
  orderBy: z.union([ WeightLogOrderByWithRelationInputSchema.array(),WeightLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WeightLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WeightLogGroupByArgsSchema: z.ZodType<Prisma.WeightLogGroupByArgs> = z.object({
  where: WeightLogWhereInputSchema.optional(),
  orderBy: z.union([ WeightLogOrderByWithAggregationInputSchema.array(),WeightLogOrderByWithAggregationInputSchema ]).optional(),
  by: WeightLogScalarFieldEnumSchema.array(),
  having: WeightLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WeightLogFindUniqueArgsSchema: z.ZodType<Prisma.WeightLogFindUniqueArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereUniqueInputSchema,
}).strict() ;

export const WeightLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WeightLogFindUniqueOrThrowArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanFindFirstArgsSchema: z.ZodType<Prisma.WorkoutPlanFindFirstArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutPlanFindFirstOrThrowArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanFindManyArgsSchema: z.ZodType<Prisma.WorkoutPlanFindManyArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanAggregateArgsSchema: z.ZodType<Prisma.WorkoutPlanAggregateArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutPlanGroupByArgsSchema: z.ZodType<Prisma.WorkoutPlanGroupByArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithAggregationInputSchema.array(),WorkoutPlanOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutPlanScalarFieldEnumSchema.array(),
  having: WorkoutPlanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutPlanFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutPlanFindUniqueArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutPlanFindUniqueOrThrowArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayFindFirstArgsSchema: z.ZodType<Prisma.WorkoutDayFindFirstArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayFindFirstOrThrowArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayFindManyArgsSchema: z.ZodType<Prisma.WorkoutDayFindManyArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayAggregateArgsSchema: z.ZodType<Prisma.WorkoutDayAggregateArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayGroupByArgsSchema: z.ZodType<Prisma.WorkoutDayGroupByArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithAggregationInputSchema.array(),WorkoutDayOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutDayScalarFieldEnumSchema.array(),
  having: WorkoutDayScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutDayFindUniqueArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayFindUniqueOrThrowArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindFirstArgsSchema: z.ZodType<Prisma.ExerciseFindFirstArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindFirstOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindManyArgsSchema: z.ZodType<Prisma.ExerciseFindManyArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseAggregateArgsSchema: z.ZodType<Prisma.ExerciseAggregateArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseGroupByArgsSchema: z.ZodType<Prisma.ExerciseGroupByArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithAggregationInputSchema.array(),ExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: ExerciseScalarFieldEnumSchema.array(),
  having: ExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseFindUniqueArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayExerciseFindFirstArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseFindFirstArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayExerciseOrderByWithRelationInputSchema.array(),WorkoutDayExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayExerciseScalarFieldEnumSchema,WorkoutDayExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayExerciseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseFindFirstOrThrowArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayExerciseOrderByWithRelationInputSchema.array(),WorkoutDayExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayExerciseScalarFieldEnumSchema,WorkoutDayExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayExerciseFindManyArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseFindManyArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayExerciseOrderByWithRelationInputSchema.array(),WorkoutDayExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayExerciseScalarFieldEnumSchema,WorkoutDayExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayExerciseAggregateArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseAggregateArgs> = z.object({
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayExerciseOrderByWithRelationInputSchema.array(),WorkoutDayExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayExerciseGroupByArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseGroupByArgs> = z.object({
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayExerciseOrderByWithAggregationInputSchema.array(),WorkoutDayExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutDayExerciseScalarFieldEnumSchema.array(),
  having: WorkoutDayExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayExerciseFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseFindUniqueArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayExerciseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseFindUniqueOrThrowArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereUniqueInputSchema,
}).strict() ;

export const WorkoutLogFindFirstArgsSchema: z.ZodType<Prisma.WorkoutLogFindFirstArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutLogOrderByWithRelationInputSchema.array(),WorkoutLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutLogScalarFieldEnumSchema,WorkoutLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutLogFindFirstOrThrowArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutLogOrderByWithRelationInputSchema.array(),WorkoutLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutLogScalarFieldEnumSchema,WorkoutLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutLogFindManyArgsSchema: z.ZodType<Prisma.WorkoutLogFindManyArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutLogOrderByWithRelationInputSchema.array(),WorkoutLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutLogScalarFieldEnumSchema,WorkoutLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutLogAggregateArgsSchema: z.ZodType<Prisma.WorkoutLogAggregateArgs> = z.object({
  where: WorkoutLogWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutLogOrderByWithRelationInputSchema.array(),WorkoutLogOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutLogGroupByArgsSchema: z.ZodType<Prisma.WorkoutLogGroupByArgs> = z.object({
  where: WorkoutLogWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutLogOrderByWithAggregationInputSchema.array(),WorkoutLogOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutLogScalarFieldEnumSchema.array(),
  having: WorkoutLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutLogFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutLogFindUniqueArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereUniqueInputSchema,
}).strict() ;

export const WorkoutLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutLogFindUniqueOrThrowArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthenticatorCreateArgsSchema: z.ZodType<Prisma.AuthenticatorCreateArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  data: z.union([ AuthenticatorCreateInputSchema,AuthenticatorUncheckedCreateInputSchema ]),
}).strict() ;

export const AuthenticatorUpsertArgsSchema: z.ZodType<Prisma.AuthenticatorUpsertArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema,
  create: z.union([ AuthenticatorCreateInputSchema,AuthenticatorUncheckedCreateInputSchema ]),
  update: z.union([ AuthenticatorUpdateInputSchema,AuthenticatorUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuthenticatorCreateManyArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyArgs> = z.object({
  data: z.union([ AuthenticatorCreateManyInputSchema,AuthenticatorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthenticatorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuthenticatorCreateManyInputSchema,AuthenticatorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuthenticatorDeleteArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  where: AuthenticatorWhereUniqueInputSchema,
}).strict() ;

export const AuthenticatorUpdateArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateArgs> = z.object({
  select: AuthenticatorSelectSchema.optional(),
  include: AuthenticatorIncludeSchema.optional(),
  data: z.union([ AuthenticatorUpdateInputSchema,AuthenticatorUncheckedUpdateInputSchema ]),
  where: AuthenticatorWhereUniqueInputSchema,
}).strict() ;

export const AuthenticatorUpdateManyArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyArgs> = z.object({
  data: z.union([ AuthenticatorUpdateManyMutationInputSchema,AuthenticatorUncheckedUpdateManyInputSchema ]),
  where: AuthenticatorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthenticatorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthenticatorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuthenticatorUpdateManyMutationInputSchema,AuthenticatorUncheckedUpdateManyInputSchema ]),
  where: AuthenticatorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthenticatorDeleteManyArgsSchema: z.ZodType<Prisma.AuthenticatorDeleteManyArgs> = z.object({
  where: AuthenticatorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HeightLogCreateArgsSchema: z.ZodType<Prisma.HeightLogCreateArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  data: z.union([ HeightLogCreateInputSchema,HeightLogUncheckedCreateInputSchema ]),
}).strict() ;

export const HeightLogUpsertArgsSchema: z.ZodType<Prisma.HeightLogUpsertArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereUniqueInputSchema,
  create: z.union([ HeightLogCreateInputSchema,HeightLogUncheckedCreateInputSchema ]),
  update: z.union([ HeightLogUpdateInputSchema,HeightLogUncheckedUpdateInputSchema ]),
}).strict() ;

export const HeightLogCreateManyArgsSchema: z.ZodType<Prisma.HeightLogCreateManyArgs> = z.object({
  data: z.union([ HeightLogCreateManyInputSchema,HeightLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HeightLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HeightLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ HeightLogCreateManyInputSchema,HeightLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HeightLogDeleteArgsSchema: z.ZodType<Prisma.HeightLogDeleteArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  where: HeightLogWhereUniqueInputSchema,
}).strict() ;

export const HeightLogUpdateArgsSchema: z.ZodType<Prisma.HeightLogUpdateArgs> = z.object({
  select: HeightLogSelectSchema.optional(),
  include: HeightLogIncludeSchema.optional(),
  data: z.union([ HeightLogUpdateInputSchema,HeightLogUncheckedUpdateInputSchema ]),
  where: HeightLogWhereUniqueInputSchema,
}).strict() ;

export const HeightLogUpdateManyArgsSchema: z.ZodType<Prisma.HeightLogUpdateManyArgs> = z.object({
  data: z.union([ HeightLogUpdateManyMutationInputSchema,HeightLogUncheckedUpdateManyInputSchema ]),
  where: HeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HeightLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HeightLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HeightLogUpdateManyMutationInputSchema,HeightLogUncheckedUpdateManyInputSchema ]),
  where: HeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HeightLogDeleteManyArgsSchema: z.ZodType<Prisma.HeightLogDeleteManyArgs> = z.object({
  where: HeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WeightLogCreateArgsSchema: z.ZodType<Prisma.WeightLogCreateArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  data: z.union([ WeightLogCreateInputSchema,WeightLogUncheckedCreateInputSchema ]),
}).strict() ;

export const WeightLogUpsertArgsSchema: z.ZodType<Prisma.WeightLogUpsertArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereUniqueInputSchema,
  create: z.union([ WeightLogCreateInputSchema,WeightLogUncheckedCreateInputSchema ]),
  update: z.union([ WeightLogUpdateInputSchema,WeightLogUncheckedUpdateInputSchema ]),
}).strict() ;

export const WeightLogCreateManyArgsSchema: z.ZodType<Prisma.WeightLogCreateManyArgs> = z.object({
  data: z.union([ WeightLogCreateManyInputSchema,WeightLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WeightLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WeightLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ WeightLogCreateManyInputSchema,WeightLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WeightLogDeleteArgsSchema: z.ZodType<Prisma.WeightLogDeleteArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  where: WeightLogWhereUniqueInputSchema,
}).strict() ;

export const WeightLogUpdateArgsSchema: z.ZodType<Prisma.WeightLogUpdateArgs> = z.object({
  select: WeightLogSelectSchema.optional(),
  include: WeightLogIncludeSchema.optional(),
  data: z.union([ WeightLogUpdateInputSchema,WeightLogUncheckedUpdateInputSchema ]),
  where: WeightLogWhereUniqueInputSchema,
}).strict() ;

export const WeightLogUpdateManyArgsSchema: z.ZodType<Prisma.WeightLogUpdateManyArgs> = z.object({
  data: z.union([ WeightLogUpdateManyMutationInputSchema,WeightLogUncheckedUpdateManyInputSchema ]),
  where: WeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WeightLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WeightLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WeightLogUpdateManyMutationInputSchema,WeightLogUncheckedUpdateManyInputSchema ]),
  where: WeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WeightLogDeleteManyArgsSchema: z.ZodType<Prisma.WeightLogDeleteManyArgs> = z.object({
  where: WeightLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutPlanCreateArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  data: z.union([ WorkoutPlanCreateInputSchema,WorkoutPlanUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutPlanUpsertArgsSchema: z.ZodType<Prisma.WorkoutPlanUpsertArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
  create: z.union([ WorkoutPlanCreateInputSchema,WorkoutPlanUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutPlanUpdateInputSchema,WorkoutPlanUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutPlanCreateManyArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateManyArgs> = z.object({
  data: z.union([ WorkoutPlanCreateManyInputSchema,WorkoutPlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutPlanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutPlanCreateManyInputSchema,WorkoutPlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutPlanDeleteArgsSchema: z.ZodType<Prisma.WorkoutPlanDeleteArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanUpdateArgsSchema: z.ZodType<Prisma.WorkoutPlanUpdateArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  data: z.union([ WorkoutPlanUpdateInputSchema,WorkoutPlanUncheckedUpdateInputSchema ]),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyArgs> = z.object({
  data: z.union([ WorkoutPlanUpdateManyMutationInputSchema,WorkoutPlanUncheckedUpdateManyInputSchema ]),
  where: WorkoutPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutPlanUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutPlanUpdateManyMutationInputSchema,WorkoutPlanUncheckedUpdateManyInputSchema ]),
  where: WorkoutPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutPlanDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutPlanDeleteManyArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayCreateArgsSchema: z.ZodType<Prisma.WorkoutDayCreateArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  data: z.union([ WorkoutDayCreateInputSchema,WorkoutDayUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutDayUpsertArgsSchema: z.ZodType<Prisma.WorkoutDayUpsertArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
  create: z.union([ WorkoutDayCreateInputSchema,WorkoutDayUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutDayUpdateInputSchema,WorkoutDayUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutDayCreateManyArgsSchema: z.ZodType<Prisma.WorkoutDayCreateManyArgs> = z.object({
  data: z.union([ WorkoutDayCreateManyInputSchema,WorkoutDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutDayCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutDayCreateManyInputSchema,WorkoutDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayDeleteArgsSchema: z.ZodType<Prisma.WorkoutDayDeleteArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayUpdateArgsSchema: z.ZodType<Prisma.WorkoutDayUpdateArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  data: z.union([ WorkoutDayUpdateInputSchema,WorkoutDayUncheckedUpdateInputSchema ]),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutDayUpdateManyArgs> = z.object({
  data: z.union([ WorkoutDayUpdateManyMutationInputSchema,WorkoutDayUncheckedUpdateManyInputSchema ]),
  where: WorkoutDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutDayUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutDayUpdateManyMutationInputSchema,WorkoutDayUncheckedUpdateManyInputSchema ]),
  where: WorkoutDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutDayDeleteManyArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExerciseCreateArgsSchema: z.ZodType<Prisma.ExerciseCreateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
}).strict() ;

export const ExerciseUpsertArgsSchema: z.ZodType<Prisma.ExerciseUpsertArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
  create: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
  update: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExerciseCreateManyArgsSchema: z.ZodType<Prisma.ExerciseCreateManyArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExerciseCreateManyAndReturnArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseDeleteArgsSchema: z.ZodType<Prisma.ExerciseDeleteArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateArgsSchema: z.ZodType<Prisma.ExerciseUpdateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateManyArgsSchema: z.ZodType<Prisma.ExerciseUpdateManyArgs> = z.object({
  data: z.union([ ExerciseUpdateManyMutationInputSchema,ExerciseUncheckedUpdateManyInputSchema ]),
  where: ExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExerciseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ExerciseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ExerciseUpdateManyMutationInputSchema,ExerciseUncheckedUpdateManyInputSchema ]),
  where: ExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExerciseDeleteManyArgsSchema: z.ZodType<Prisma.ExerciseDeleteManyArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayExerciseCreateArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  data: z.union([ WorkoutDayExerciseCreateInputSchema,WorkoutDayExerciseUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutDayExerciseUpsertArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseUpsertArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereUniqueInputSchema,
  create: z.union([ WorkoutDayExerciseCreateInputSchema,WorkoutDayExerciseUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutDayExerciseUpdateInputSchema,WorkoutDayExerciseUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutDayExerciseCreateManyArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyArgs> = z.object({
  data: z.union([ WorkoutDayExerciseCreateManyInputSchema,WorkoutDayExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayExerciseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutDayExerciseCreateManyInputSchema,WorkoutDayExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayExerciseDeleteArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseDeleteArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  where: WorkoutDayExerciseWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayExerciseUpdateArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateArgs> = z.object({
  select: WorkoutDayExerciseSelectSchema.optional(),
  include: WorkoutDayExerciseIncludeSchema.optional(),
  data: z.union([ WorkoutDayExerciseUpdateInputSchema,WorkoutDayExerciseUncheckedUpdateInputSchema ]),
  where: WorkoutDayExerciseWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayExerciseUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyArgs> = z.object({
  data: z.union([ WorkoutDayExerciseUpdateManyMutationInputSchema,WorkoutDayExerciseUncheckedUpdateManyInputSchema ]),
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayExerciseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutDayExerciseUpdateManyMutationInputSchema,WorkoutDayExerciseUncheckedUpdateManyInputSchema ]),
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutDayExerciseDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutDayExerciseDeleteManyArgs> = z.object({
  where: WorkoutDayExerciseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutLogCreateArgsSchema: z.ZodType<Prisma.WorkoutLogCreateArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  data: z.union([ WorkoutLogCreateInputSchema,WorkoutLogUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutLogUpsertArgsSchema: z.ZodType<Prisma.WorkoutLogUpsertArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereUniqueInputSchema,
  create: z.union([ WorkoutLogCreateInputSchema,WorkoutLogUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutLogUpdateInputSchema,WorkoutLogUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutLogCreateManyArgsSchema: z.ZodType<Prisma.WorkoutLogCreateManyArgs> = z.object({
  data: z.union([ WorkoutLogCreateManyInputSchema,WorkoutLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutLogCreateManyInputSchema,WorkoutLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutLogDeleteArgsSchema: z.ZodType<Prisma.WorkoutLogDeleteArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  where: WorkoutLogWhereUniqueInputSchema,
}).strict() ;

export const WorkoutLogUpdateArgsSchema: z.ZodType<Prisma.WorkoutLogUpdateArgs> = z.object({
  select: WorkoutLogSelectSchema.optional(),
  include: WorkoutLogIncludeSchema.optional(),
  data: z.union([ WorkoutLogUpdateInputSchema,WorkoutLogUncheckedUpdateInputSchema ]),
  where: WorkoutLogWhereUniqueInputSchema,
}).strict() ;

export const WorkoutLogUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutLogUpdateManyArgs> = z.object({
  data: z.union([ WorkoutLogUpdateManyMutationInputSchema,WorkoutLogUncheckedUpdateManyInputSchema ]),
  where: WorkoutLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutLogUpdateManyMutationInputSchema,WorkoutLogUncheckedUpdateManyInputSchema ]),
  where: WorkoutLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WorkoutLogDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutLogDeleteManyArgs> = z.object({
  where: WorkoutLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;