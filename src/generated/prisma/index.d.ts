
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Pendaftaran
 * 
 */
export type Pendaftaran = $Result.DefaultSelection<Prisma.$PendaftaranPayload>
/**
 * Model RekamMedis
 * 
 */
export type RekamMedis = $Result.DefaultSelection<Prisma.$RekamMedisPayload>
/**
 * Model JadwalDokter
 * 
 */
export type JadwalDokter = $Result.DefaultSelection<Prisma.$JadwalDokterPayload>
/**
 * Model Pembayaran
 * 
 */
export type Pembayaran = $Result.DefaultSelection<Prisma.$PembayaranPayload>
/**
 * Model Notifikasi
 * 
 */
export type Notifikasi = $Result.DefaultSelection<Prisma.$NotifikasiPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendaftaran`: Exposes CRUD operations for the **Pendaftaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pendaftarans
    * const pendaftarans = await prisma.pendaftaran.findMany()
    * ```
    */
  get pendaftaran(): Prisma.PendaftaranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rekamMedis`: Exposes CRUD operations for the **RekamMedis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RekamMedis
    * const rekamMedis = await prisma.rekamMedis.findMany()
    * ```
    */
  get rekamMedis(): Prisma.RekamMedisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jadwalDokter`: Exposes CRUD operations for the **JadwalDokter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JadwalDokters
    * const jadwalDokters = await prisma.jadwalDokter.findMany()
    * ```
    */
  get jadwalDokter(): Prisma.JadwalDokterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pembayaran`: Exposes CRUD operations for the **Pembayaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pembayarans
    * const pembayarans = await prisma.pembayaran.findMany()
    * ```
    */
  get pembayaran(): Prisma.PembayaranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notifikasi`: Exposes CRUD operations for the **Notifikasi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifikasis
    * const notifikasis = await prisma.notifikasi.findMany()
    * ```
    */
  get notifikasi(): Prisma.NotifikasiDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Pendaftaran: 'Pendaftaran',
    RekamMedis: 'RekamMedis',
    JadwalDokter: 'JadwalDokter',
    Pembayaran: 'Pembayaran',
    Notifikasi: 'Notifikasi'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "pendaftaran" | "rekamMedis" | "jadwalDokter" | "pembayaran" | "notifikasi"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Pendaftaran: {
        payload: Prisma.$PendaftaranPayload<ExtArgs>
        fields: Prisma.PendaftaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendaftaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendaftaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          findFirst: {
            args: Prisma.PendaftaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendaftaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          findMany: {
            args: Prisma.PendaftaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          create: {
            args: Prisma.PendaftaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          createMany: {
            args: Prisma.PendaftaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendaftaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          delete: {
            args: Prisma.PendaftaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          update: {
            args: Prisma.PendaftaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          deleteMany: {
            args: Prisma.PendaftaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendaftaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendaftaranUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          upsert: {
            args: Prisma.PendaftaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          aggregate: {
            args: Prisma.PendaftaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendaftaran>
          }
          groupBy: {
            args: Prisma.PendaftaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendaftaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendaftaranCountArgs<ExtArgs>
            result: $Utils.Optional<PendaftaranCountAggregateOutputType> | number
          }
        }
      }
      RekamMedis: {
        payload: Prisma.$RekamMedisPayload<ExtArgs>
        fields: Prisma.RekamMedisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RekamMedisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RekamMedisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          findFirst: {
            args: Prisma.RekamMedisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RekamMedisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          findMany: {
            args: Prisma.RekamMedisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>[]
          }
          create: {
            args: Prisma.RekamMedisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          createMany: {
            args: Prisma.RekamMedisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RekamMedisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>[]
          }
          delete: {
            args: Prisma.RekamMedisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          update: {
            args: Prisma.RekamMedisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          deleteMany: {
            args: Prisma.RekamMedisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RekamMedisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RekamMedisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>[]
          }
          upsert: {
            args: Prisma.RekamMedisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekamMedisPayload>
          }
          aggregate: {
            args: Prisma.RekamMedisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRekamMedis>
          }
          groupBy: {
            args: Prisma.RekamMedisGroupByArgs<ExtArgs>
            result: $Utils.Optional<RekamMedisGroupByOutputType>[]
          }
          count: {
            args: Prisma.RekamMedisCountArgs<ExtArgs>
            result: $Utils.Optional<RekamMedisCountAggregateOutputType> | number
          }
        }
      }
      JadwalDokter: {
        payload: Prisma.$JadwalDokterPayload<ExtArgs>
        fields: Prisma.JadwalDokterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JadwalDokterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JadwalDokterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          findFirst: {
            args: Prisma.JadwalDokterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JadwalDokterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          findMany: {
            args: Prisma.JadwalDokterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>[]
          }
          create: {
            args: Prisma.JadwalDokterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          createMany: {
            args: Prisma.JadwalDokterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JadwalDokterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>[]
          }
          delete: {
            args: Prisma.JadwalDokterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          update: {
            args: Prisma.JadwalDokterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          deleteMany: {
            args: Prisma.JadwalDokterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JadwalDokterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JadwalDokterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>[]
          }
          upsert: {
            args: Prisma.JadwalDokterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalDokterPayload>
          }
          aggregate: {
            args: Prisma.JadwalDokterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJadwalDokter>
          }
          groupBy: {
            args: Prisma.JadwalDokterGroupByArgs<ExtArgs>
            result: $Utils.Optional<JadwalDokterGroupByOutputType>[]
          }
          count: {
            args: Prisma.JadwalDokterCountArgs<ExtArgs>
            result: $Utils.Optional<JadwalDokterCountAggregateOutputType> | number
          }
        }
      }
      Pembayaran: {
        payload: Prisma.$PembayaranPayload<ExtArgs>
        fields: Prisma.PembayaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PembayaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PembayaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findFirst: {
            args: Prisma.PembayaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PembayaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findMany: {
            args: Prisma.PembayaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          create: {
            args: Prisma.PembayaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          createMany: {
            args: Prisma.PembayaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PembayaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          delete: {
            args: Prisma.PembayaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          update: {
            args: Prisma.PembayaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          deleteMany: {
            args: Prisma.PembayaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PembayaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PembayaranUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          upsert: {
            args: Prisma.PembayaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          aggregate: {
            args: Prisma.PembayaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePembayaran>
          }
          groupBy: {
            args: Prisma.PembayaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<PembayaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.PembayaranCountArgs<ExtArgs>
            result: $Utils.Optional<PembayaranCountAggregateOutputType> | number
          }
        }
      }
      Notifikasi: {
        payload: Prisma.$NotifikasiPayload<ExtArgs>
        fields: Prisma.NotifikasiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotifikasiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotifikasiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          findFirst: {
            args: Prisma.NotifikasiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotifikasiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          findMany: {
            args: Prisma.NotifikasiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>[]
          }
          create: {
            args: Prisma.NotifikasiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          createMany: {
            args: Prisma.NotifikasiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotifikasiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>[]
          }
          delete: {
            args: Prisma.NotifikasiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          update: {
            args: Prisma.NotifikasiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          deleteMany: {
            args: Prisma.NotifikasiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotifikasiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotifikasiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>[]
          }
          upsert: {
            args: Prisma.NotifikasiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotifikasiPayload>
          }
          aggregate: {
            args: Prisma.NotifikasiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotifikasi>
          }
          groupBy: {
            args: Prisma.NotifikasiGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotifikasiGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotifikasiCountArgs<ExtArgs>
            result: $Utils.Optional<NotifikasiCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    pendaftaran?: PendaftaranOmit
    rekamMedis?: RekamMedisOmit
    jadwalDokter?: JadwalDokterOmit
    pembayaran?: PembayaranOmit
    notifikasi?: NotifikasiOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jadwalDokter: number
    pendaftarans: number
    pendaftarDokter: number
    pendaftarDiterima: number
    notifikasis: number
    pembayarans: number
    rekamMedisDokter: number
    rekamMedisPasien: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwalDokter?: boolean | UserCountOutputTypeCountJadwalDokterArgs
    pendaftarans?: boolean | UserCountOutputTypeCountPendaftaransArgs
    pendaftarDokter?: boolean | UserCountOutputTypeCountPendaftarDokterArgs
    pendaftarDiterima?: boolean | UserCountOutputTypeCountPendaftarDiterimaArgs
    notifikasis?: boolean | UserCountOutputTypeCountNotifikasisArgs
    pembayarans?: boolean | UserCountOutputTypeCountPembayaransArgs
    rekamMedisDokter?: boolean | UserCountOutputTypeCountRekamMedisDokterArgs
    rekamMedisPasien?: boolean | UserCountOutputTypeCountRekamMedisPasienArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJadwalDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalDokterWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPendaftaransArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendaftaranWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPendaftarDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendaftaranWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPendaftarDiterimaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendaftaranWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotifikasisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotifikasiWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPembayaransArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PembayaranWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRekamMedisDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekamMedisWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRekamMedisPasienArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekamMedisWhereInput
  }


  /**
   * Count Type PendaftaranCountOutputType
   */

  export type PendaftaranCountOutputType = {
    rekamMedis: number
  }

  export type PendaftaranCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekamMedis?: boolean | PendaftaranCountOutputTypeCountRekamMedisArgs
  }

  // Custom InputTypes
  /**
   * PendaftaranCountOutputType without action
   */
  export type PendaftaranCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendaftaranCountOutputType
     */
    select?: PendaftaranCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PendaftaranCountOutputType without action
   */
  export type PendaftaranCountOutputTypeCountRekamMedisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekamMedisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: bigint | null
    roleId: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    username: string | null
    email: string | null
    emailVerifiedAt: Date | null
    password: string | null
    role: string | null
    spesialis: string | null
    alamat: string | null
    telepon: string | null
    noHp: string | null
    tanggalLahir: Date | null
    jenisKelamin: string | null
    nik: string | null
    noRm: string | null
    qrToken: string | null
    qrPath: string | null
    roleId: bigint | null
    rememberToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    username: string | null
    email: string | null
    emailVerifiedAt: Date | null
    password: string | null
    role: string | null
    spesialis: string | null
    alamat: string | null
    telepon: string | null
    noHp: string | null
    tanggalLahir: Date | null
    jenisKelamin: string | null
    nik: string | null
    noRm: string | null
    qrToken: string | null
    qrPath: string | null
    roleId: bigint | null
    rememberToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    username: number
    email: number
    emailVerifiedAt: number
    password: number
    role: number
    spesialis: number
    alamat: number
    telepon: number
    noHp: number
    tanggalLahir: number
    jenisKelamin: number
    nik: number
    noRm: number
    qrToken: number
    qrPath: number
    roleId: number
    rememberToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    role?: true
    spesialis?: true
    alamat?: true
    telepon?: true
    noHp?: true
    tanggalLahir?: true
    jenisKelamin?: true
    nik?: true
    noRm?: true
    qrToken?: true
    qrPath?: true
    roleId?: true
    rememberToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    role?: true
    spesialis?: true
    alamat?: true
    telepon?: true
    noHp?: true
    tanggalLahir?: true
    jenisKelamin?: true
    nik?: true
    noRm?: true
    qrToken?: true
    qrPath?: true
    roleId?: true
    rememberToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    role?: true
    spesialis?: true
    alamat?: true
    telepon?: true
    noHp?: true
    tanggalLahir?: true
    jenisKelamin?: true
    nik?: true
    noRm?: true
    qrToken?: true
    qrPath?: true
    roleId?: true
    rememberToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: bigint
    name: string
    username: string
    email: string
    emailVerifiedAt: Date | null
    password: string
    role: string
    spesialis: string | null
    alamat: string | null
    telepon: string | null
    noHp: string | null
    tanggalLahir: Date | null
    jenisKelamin: string | null
    nik: string | null
    noRm: string | null
    qrToken: string | null
    qrPath: string | null
    roleId: bigint | null
    rememberToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    role?: boolean
    spesialis?: boolean
    alamat?: boolean
    telepon?: boolean
    noHp?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    nik?: boolean
    noRm?: boolean
    qrToken?: boolean
    qrPath?: boolean
    roleId?: boolean
    rememberToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jadwalDokter?: boolean | User$jadwalDokterArgs<ExtArgs>
    pendaftarans?: boolean | User$pendaftaransArgs<ExtArgs>
    pendaftarDokter?: boolean | User$pendaftarDokterArgs<ExtArgs>
    pendaftarDiterima?: boolean | User$pendaftarDiterimaArgs<ExtArgs>
    notifikasis?: boolean | User$notifikasisArgs<ExtArgs>
    pembayarans?: boolean | User$pembayaransArgs<ExtArgs>
    rekamMedisDokter?: boolean | User$rekamMedisDokterArgs<ExtArgs>
    rekamMedisPasien?: boolean | User$rekamMedisPasienArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    role?: boolean
    spesialis?: boolean
    alamat?: boolean
    telepon?: boolean
    noHp?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    nik?: boolean
    noRm?: boolean
    qrToken?: boolean
    qrPath?: boolean
    roleId?: boolean
    rememberToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    role?: boolean
    spesialis?: boolean
    alamat?: boolean
    telepon?: boolean
    noHp?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    nik?: boolean
    noRm?: boolean
    qrToken?: boolean
    qrPath?: boolean
    roleId?: boolean
    rememberToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    role?: boolean
    spesialis?: boolean
    alamat?: boolean
    telepon?: boolean
    noHp?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    nik?: boolean
    noRm?: boolean
    qrToken?: boolean
    qrPath?: boolean
    roleId?: boolean
    rememberToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "username" | "email" | "emailVerifiedAt" | "password" | "role" | "spesialis" | "alamat" | "telepon" | "noHp" | "tanggalLahir" | "jenisKelamin" | "nik" | "noRm" | "qrToken" | "qrPath" | "roleId" | "rememberToken" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwalDokter?: boolean | User$jadwalDokterArgs<ExtArgs>
    pendaftarans?: boolean | User$pendaftaransArgs<ExtArgs>
    pendaftarDokter?: boolean | User$pendaftarDokterArgs<ExtArgs>
    pendaftarDiterima?: boolean | User$pendaftarDiterimaArgs<ExtArgs>
    notifikasis?: boolean | User$notifikasisArgs<ExtArgs>
    pembayarans?: boolean | User$pembayaransArgs<ExtArgs>
    rekamMedisDokter?: boolean | User$rekamMedisDokterArgs<ExtArgs>
    rekamMedisPasien?: boolean | User$rekamMedisPasienArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      jadwalDokter: Prisma.$JadwalDokterPayload<ExtArgs>[]
      pendaftarans: Prisma.$PendaftaranPayload<ExtArgs>[]
      pendaftarDokter: Prisma.$PendaftaranPayload<ExtArgs>[]
      pendaftarDiterima: Prisma.$PendaftaranPayload<ExtArgs>[]
      notifikasis: Prisma.$NotifikasiPayload<ExtArgs>[]
      pembayarans: Prisma.$PembayaranPayload<ExtArgs>[]
      rekamMedisDokter: Prisma.$RekamMedisPayload<ExtArgs>[]
      rekamMedisPasien: Prisma.$RekamMedisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      username: string
      email: string
      emailVerifiedAt: Date | null
      password: string
      role: string
      spesialis: string | null
      alamat: string | null
      telepon: string | null
      noHp: string | null
      tanggalLahir: Date | null
      jenisKelamin: string | null
      nik: string | null
      noRm: string | null
      qrToken: string | null
      qrPath: string | null
      roleId: bigint | null
      rememberToken: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jadwalDokter<T extends User$jadwalDokterArgs<ExtArgs> = {}>(args?: Subset<T, User$jadwalDokterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendaftarans<T extends User$pendaftaransArgs<ExtArgs> = {}>(args?: Subset<T, User$pendaftaransArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendaftarDokter<T extends User$pendaftarDokterArgs<ExtArgs> = {}>(args?: Subset<T, User$pendaftarDokterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pendaftarDiterima<T extends User$pendaftarDiterimaArgs<ExtArgs> = {}>(args?: Subset<T, User$pendaftarDiterimaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifikasis<T extends User$notifikasisArgs<ExtArgs> = {}>(args?: Subset<T, User$notifikasisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pembayarans<T extends User$pembayaransArgs<ExtArgs> = {}>(args?: Subset<T, User$pembayaransArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rekamMedisDokter<T extends User$rekamMedisDokterArgs<ExtArgs> = {}>(args?: Subset<T, User$rekamMedisDokterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rekamMedisPasien<T extends User$rekamMedisPasienArgs<ExtArgs> = {}>(args?: Subset<T, User$rekamMedisPasienArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'BigInt'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly spesialis: FieldRef<"User", 'String'>
    readonly alamat: FieldRef<"User", 'String'>
    readonly telepon: FieldRef<"User", 'String'>
    readonly noHp: FieldRef<"User", 'String'>
    readonly tanggalLahir: FieldRef<"User", 'DateTime'>
    readonly jenisKelamin: FieldRef<"User", 'String'>
    readonly nik: FieldRef<"User", 'String'>
    readonly noRm: FieldRef<"User", 'String'>
    readonly qrToken: FieldRef<"User", 'String'>
    readonly qrPath: FieldRef<"User", 'String'>
    readonly roleId: FieldRef<"User", 'BigInt'>
    readonly rememberToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.jadwalDokter
   */
  export type User$jadwalDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    where?: JadwalDokterWhereInput
    orderBy?: JadwalDokterOrderByWithRelationInput | JadwalDokterOrderByWithRelationInput[]
    cursor?: JadwalDokterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JadwalDokterScalarFieldEnum | JadwalDokterScalarFieldEnum[]
  }

  /**
   * User.pendaftarans
   */
  export type User$pendaftaransArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    where?: PendaftaranWhereInput
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    cursor?: PendaftaranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * User.pendaftarDokter
   */
  export type User$pendaftarDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    where?: PendaftaranWhereInput
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    cursor?: PendaftaranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * User.pendaftarDiterima
   */
  export type User$pendaftarDiterimaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    where?: PendaftaranWhereInput
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    cursor?: PendaftaranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * User.notifikasis
   */
  export type User$notifikasisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    where?: NotifikasiWhereInput
    orderBy?: NotifikasiOrderByWithRelationInput | NotifikasiOrderByWithRelationInput[]
    cursor?: NotifikasiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotifikasiScalarFieldEnum | NotifikasiScalarFieldEnum[]
  }

  /**
   * User.pembayarans
   */
  export type User$pembayaransArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    where?: PembayaranWhereInput
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    cursor?: PembayaranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * User.rekamMedisDokter
   */
  export type User$rekamMedisDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    where?: RekamMedisWhereInput
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    cursor?: RekamMedisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * User.rekamMedisPasien
   */
  export type User$rekamMedisPasienArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    where?: RekamMedisWhereInput
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    cursor?: RekamMedisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Pendaftaran
   */

  export type AggregatePendaftaran = {
    _count: PendaftaranCountAggregateOutputType | null
    _avg: PendaftaranAvgAggregateOutputType | null
    _sum: PendaftaranSumAggregateOutputType | null
    _min: PendaftaranMinAggregateOutputType | null
    _max: PendaftaranMaxAggregateOutputType | null
  }

  export type PendaftaranAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    dokterId: number | null
    diterimaOlehDokterId: number | null
    nomorUrut: number | null
    checkedInBy: number | null
    noShowBy: number | null
  }

  export type PendaftaranSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    dokterId: bigint | null
    diterimaOlehDokterId: bigint | null
    nomorUrut: number | null
    checkedInBy: bigint | null
    noShowBy: bigint | null
  }

  export type PendaftaranMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    dokterId: bigint | null
    diterimaOlehDokterId: bigint | null
    nama: string | null
    tanggalLahir: Date | null
    jenisKelamin: string | null
    noHp: string | null
    nik: string | null
    keluhan: string | null
    tanggalKunjungan: Date | null
    jamKunjungan: Date | null
    spesialis: string | null
    status: string | null
    nomorUrut: number | null
    kodeAntrian: string | null
    qrToken: string | null
    qrPath: string | null
    checkinAt: Date | null
    checkedInAt: Date | null
    checkedInBy: bigint | null
    noShowAt: Date | null
    noShowBy: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendaftaranMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    dokterId: bigint | null
    diterimaOlehDokterId: bigint | null
    nama: string | null
    tanggalLahir: Date | null
    jenisKelamin: string | null
    noHp: string | null
    nik: string | null
    keluhan: string | null
    tanggalKunjungan: Date | null
    jamKunjungan: Date | null
    spesialis: string | null
    status: string | null
    nomorUrut: number | null
    kodeAntrian: string | null
    qrToken: string | null
    qrPath: string | null
    checkinAt: Date | null
    checkedInAt: Date | null
    checkedInBy: bigint | null
    noShowAt: Date | null
    noShowBy: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendaftaranCountAggregateOutputType = {
    id: number
    userId: number
    dokterId: number
    diterimaOlehDokterId: number
    nama: number
    tanggalLahir: number
    jenisKelamin: number
    noHp: number
    nik: number
    keluhan: number
    tanggalKunjungan: number
    jamKunjungan: number
    spesialis: number
    status: number
    nomorUrut: number
    kodeAntrian: number
    qrToken: number
    qrPath: number
    checkinAt: number
    checkedInAt: number
    checkedInBy: number
    noShowAt: number
    noShowBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PendaftaranAvgAggregateInputType = {
    id?: true
    userId?: true
    dokterId?: true
    diterimaOlehDokterId?: true
    nomorUrut?: true
    checkedInBy?: true
    noShowBy?: true
  }

  export type PendaftaranSumAggregateInputType = {
    id?: true
    userId?: true
    dokterId?: true
    diterimaOlehDokterId?: true
    nomorUrut?: true
    checkedInBy?: true
    noShowBy?: true
  }

  export type PendaftaranMinAggregateInputType = {
    id?: true
    userId?: true
    dokterId?: true
    diterimaOlehDokterId?: true
    nama?: true
    tanggalLahir?: true
    jenisKelamin?: true
    noHp?: true
    nik?: true
    keluhan?: true
    tanggalKunjungan?: true
    jamKunjungan?: true
    spesialis?: true
    status?: true
    nomorUrut?: true
    kodeAntrian?: true
    qrToken?: true
    qrPath?: true
    checkinAt?: true
    checkedInAt?: true
    checkedInBy?: true
    noShowAt?: true
    noShowBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendaftaranMaxAggregateInputType = {
    id?: true
    userId?: true
    dokterId?: true
    diterimaOlehDokterId?: true
    nama?: true
    tanggalLahir?: true
    jenisKelamin?: true
    noHp?: true
    nik?: true
    keluhan?: true
    tanggalKunjungan?: true
    jamKunjungan?: true
    spesialis?: true
    status?: true
    nomorUrut?: true
    kodeAntrian?: true
    qrToken?: true
    qrPath?: true
    checkinAt?: true
    checkedInAt?: true
    checkedInBy?: true
    noShowAt?: true
    noShowBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendaftaranCountAggregateInputType = {
    id?: true
    userId?: true
    dokterId?: true
    diterimaOlehDokterId?: true
    nama?: true
    tanggalLahir?: true
    jenisKelamin?: true
    noHp?: true
    nik?: true
    keluhan?: true
    tanggalKunjungan?: true
    jamKunjungan?: true
    spesialis?: true
    status?: true
    nomorUrut?: true
    kodeAntrian?: true
    qrToken?: true
    qrPath?: true
    checkinAt?: true
    checkedInAt?: true
    checkedInBy?: true
    noShowAt?: true
    noShowBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PendaftaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pendaftaran to aggregate.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pendaftarans
    **/
    _count?: true | PendaftaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PendaftaranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PendaftaranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendaftaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendaftaranMaxAggregateInputType
  }

  export type GetPendaftaranAggregateType<T extends PendaftaranAggregateArgs> = {
        [P in keyof T & keyof AggregatePendaftaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendaftaran[P]>
      : GetScalarType<T[P], AggregatePendaftaran[P]>
  }




  export type PendaftaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendaftaranWhereInput
    orderBy?: PendaftaranOrderByWithAggregationInput | PendaftaranOrderByWithAggregationInput[]
    by: PendaftaranScalarFieldEnum[] | PendaftaranScalarFieldEnum
    having?: PendaftaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendaftaranCountAggregateInputType | true
    _avg?: PendaftaranAvgAggregateInputType
    _sum?: PendaftaranSumAggregateInputType
    _min?: PendaftaranMinAggregateInputType
    _max?: PendaftaranMaxAggregateInputType
  }

  export type PendaftaranGroupByOutputType = {
    id: bigint
    userId: bigint
    dokterId: bigint | null
    diterimaOlehDokterId: bigint | null
    nama: string
    tanggalLahir: Date
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan: Date | null
    jamKunjungan: Date | null
    spesialis: string | null
    status: string
    nomorUrut: number | null
    kodeAntrian: string | null
    qrToken: string | null
    qrPath: string | null
    checkinAt: Date | null
    checkedInAt: Date | null
    checkedInBy: bigint | null
    noShowAt: Date | null
    noShowBy: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: PendaftaranCountAggregateOutputType | null
    _avg: PendaftaranAvgAggregateOutputType | null
    _sum: PendaftaranSumAggregateOutputType | null
    _min: PendaftaranMinAggregateOutputType | null
    _max: PendaftaranMaxAggregateOutputType | null
  }

  type GetPendaftaranGroupByPayload<T extends PendaftaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendaftaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendaftaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendaftaranGroupByOutputType[P]>
            : GetScalarType<T[P], PendaftaranGroupByOutputType[P]>
        }
      >
    >


  export type PendaftaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dokterId?: boolean
    diterimaOlehDokterId?: boolean
    nama?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    noHp?: boolean
    nik?: boolean
    keluhan?: boolean
    tanggalKunjungan?: boolean
    jamKunjungan?: boolean
    spesialis?: boolean
    status?: boolean
    nomorUrut?: boolean
    kodeAntrian?: boolean
    qrToken?: boolean
    qrPath?: boolean
    checkinAt?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    noShowAt?: boolean
    noShowBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
    rekamMedis?: boolean | Pendaftaran$rekamMedisArgs<ExtArgs>
    _count?: boolean | PendaftaranCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dokterId?: boolean
    diterimaOlehDokterId?: boolean
    nama?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    noHp?: boolean
    nik?: boolean
    keluhan?: boolean
    tanggalKunjungan?: boolean
    jamKunjungan?: boolean
    spesialis?: boolean
    status?: boolean
    nomorUrut?: boolean
    kodeAntrian?: boolean
    qrToken?: boolean
    qrPath?: boolean
    checkinAt?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    noShowAt?: boolean
    noShowBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dokterId?: boolean
    diterimaOlehDokterId?: boolean
    nama?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    noHp?: boolean
    nik?: boolean
    keluhan?: boolean
    tanggalKunjungan?: boolean
    jamKunjungan?: boolean
    spesialis?: boolean
    status?: boolean
    nomorUrut?: boolean
    kodeAntrian?: boolean
    qrToken?: boolean
    qrPath?: boolean
    checkinAt?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    noShowAt?: boolean
    noShowBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectScalar = {
    id?: boolean
    userId?: boolean
    dokterId?: boolean
    diterimaOlehDokterId?: boolean
    nama?: boolean
    tanggalLahir?: boolean
    jenisKelamin?: boolean
    noHp?: boolean
    nik?: boolean
    keluhan?: boolean
    tanggalKunjungan?: boolean
    jamKunjungan?: boolean
    spesialis?: boolean
    status?: boolean
    nomorUrut?: boolean
    kodeAntrian?: boolean
    qrToken?: boolean
    qrPath?: boolean
    checkinAt?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    noShowAt?: boolean
    noShowBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PendaftaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dokterId" | "diterimaOlehDokterId" | "nama" | "tanggalLahir" | "jenisKelamin" | "noHp" | "nik" | "keluhan" | "tanggalKunjungan" | "jamKunjungan" | "spesialis" | "status" | "nomorUrut" | "kodeAntrian" | "qrToken" | "qrPath" | "checkinAt" | "checkedInAt" | "checkedInBy" | "noShowAt" | "noShowBy" | "createdAt" | "updatedAt", ExtArgs["result"]["pendaftaran"]>
  export type PendaftaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
    rekamMedis?: boolean | Pendaftaran$rekamMedisArgs<ExtArgs>
    _count?: boolean | PendaftaranCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PendaftaranIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
  }
  export type PendaftaranIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dokter?: boolean | Pendaftaran$dokterArgs<ExtArgs>
    diterimaOlehDokter?: boolean | Pendaftaran$diterimaOlehDokterArgs<ExtArgs>
  }

  export type $PendaftaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pendaftaran"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      dokter: Prisma.$UserPayload<ExtArgs> | null
      diterimaOlehDokter: Prisma.$UserPayload<ExtArgs> | null
      rekamMedis: Prisma.$RekamMedisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      dokterId: bigint | null
      diterimaOlehDokterId: bigint | null
      nama: string
      tanggalLahir: Date
      jenisKelamin: string
      noHp: string
      nik: string
      keluhan: string
      tanggalKunjungan: Date | null
      jamKunjungan: Date | null
      spesialis: string | null
      status: string
      nomorUrut: number | null
      kodeAntrian: string | null
      qrToken: string | null
      qrPath: string | null
      checkinAt: Date | null
      checkedInAt: Date | null
      checkedInBy: bigint | null
      noShowAt: Date | null
      noShowBy: bigint | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["pendaftaran"]>
    composites: {}
  }

  type PendaftaranGetPayload<S extends boolean | null | undefined | PendaftaranDefaultArgs> = $Result.GetResult<Prisma.$PendaftaranPayload, S>

  type PendaftaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendaftaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendaftaranCountAggregateInputType | true
    }

  export interface PendaftaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pendaftaran'], meta: { name: 'Pendaftaran' } }
    /**
     * Find zero or one Pendaftaran that matches the filter.
     * @param {PendaftaranFindUniqueArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendaftaranFindUniqueArgs>(args: SelectSubset<T, PendaftaranFindUniqueArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pendaftaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendaftaranFindUniqueOrThrowArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendaftaranFindUniqueOrThrowArgs>(args: SelectSubset<T, PendaftaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pendaftaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindFirstArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendaftaranFindFirstArgs>(args?: SelectSubset<T, PendaftaranFindFirstArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pendaftaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindFirstOrThrowArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendaftaranFindFirstOrThrowArgs>(args?: SelectSubset<T, PendaftaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pendaftarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pendaftarans
     * const pendaftarans = await prisma.pendaftaran.findMany()
     * 
     * // Get first 10 Pendaftarans
     * const pendaftarans = await prisma.pendaftaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendaftaranFindManyArgs>(args?: SelectSubset<T, PendaftaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pendaftaran.
     * @param {PendaftaranCreateArgs} args - Arguments to create a Pendaftaran.
     * @example
     * // Create one Pendaftaran
     * const Pendaftaran = await prisma.pendaftaran.create({
     *   data: {
     *     // ... data to create a Pendaftaran
     *   }
     * })
     * 
     */
    create<T extends PendaftaranCreateArgs>(args: SelectSubset<T, PendaftaranCreateArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pendaftarans.
     * @param {PendaftaranCreateManyArgs} args - Arguments to create many Pendaftarans.
     * @example
     * // Create many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendaftaranCreateManyArgs>(args?: SelectSubset<T, PendaftaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pendaftarans and returns the data saved in the database.
     * @param {PendaftaranCreateManyAndReturnArgs} args - Arguments to create many Pendaftarans.
     * @example
     * // Create many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pendaftarans and only return the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendaftaranCreateManyAndReturnArgs>(args?: SelectSubset<T, PendaftaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pendaftaran.
     * @param {PendaftaranDeleteArgs} args - Arguments to delete one Pendaftaran.
     * @example
     * // Delete one Pendaftaran
     * const Pendaftaran = await prisma.pendaftaran.delete({
     *   where: {
     *     // ... filter to delete one Pendaftaran
     *   }
     * })
     * 
     */
    delete<T extends PendaftaranDeleteArgs>(args: SelectSubset<T, PendaftaranDeleteArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pendaftaran.
     * @param {PendaftaranUpdateArgs} args - Arguments to update one Pendaftaran.
     * @example
     * // Update one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendaftaranUpdateArgs>(args: SelectSubset<T, PendaftaranUpdateArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pendaftarans.
     * @param {PendaftaranDeleteManyArgs} args - Arguments to filter Pendaftarans to delete.
     * @example
     * // Delete a few Pendaftarans
     * const { count } = await prisma.pendaftaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendaftaranDeleteManyArgs>(args?: SelectSubset<T, PendaftaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pendaftarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendaftaranUpdateManyArgs>(args: SelectSubset<T, PendaftaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pendaftarans and returns the data updated in the database.
     * @param {PendaftaranUpdateManyAndReturnArgs} args - Arguments to update many Pendaftarans.
     * @example
     * // Update many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pendaftarans and only return the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendaftaranUpdateManyAndReturnArgs>(args: SelectSubset<T, PendaftaranUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pendaftaran.
     * @param {PendaftaranUpsertArgs} args - Arguments to update or create a Pendaftaran.
     * @example
     * // Update or create a Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.upsert({
     *   create: {
     *     // ... data to create a Pendaftaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pendaftaran we want to update
     *   }
     * })
     */
    upsert<T extends PendaftaranUpsertArgs>(args: SelectSubset<T, PendaftaranUpsertArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pendaftarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranCountArgs} args - Arguments to filter Pendaftarans to count.
     * @example
     * // Count the number of Pendaftarans
     * const count = await prisma.pendaftaran.count({
     *   where: {
     *     // ... the filter for the Pendaftarans we want to count
     *   }
     * })
    **/
    count<T extends PendaftaranCountArgs>(
      args?: Subset<T, PendaftaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendaftaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pendaftaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendaftaranAggregateArgs>(args: Subset<T, PendaftaranAggregateArgs>): Prisma.PrismaPromise<GetPendaftaranAggregateType<T>>

    /**
     * Group by Pendaftaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendaftaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendaftaranGroupByArgs['orderBy'] }
        : { orderBy?: PendaftaranGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendaftaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendaftaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pendaftaran model
   */
  readonly fields: PendaftaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pendaftaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendaftaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dokter<T extends Pendaftaran$dokterArgs<ExtArgs> = {}>(args?: Subset<T, Pendaftaran$dokterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    diterimaOlehDokter<T extends Pendaftaran$diterimaOlehDokterArgs<ExtArgs> = {}>(args?: Subset<T, Pendaftaran$diterimaOlehDokterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rekamMedis<T extends Pendaftaran$rekamMedisArgs<ExtArgs> = {}>(args?: Subset<T, Pendaftaran$rekamMedisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pendaftaran model
   */
  interface PendaftaranFieldRefs {
    readonly id: FieldRef<"Pendaftaran", 'BigInt'>
    readonly userId: FieldRef<"Pendaftaran", 'BigInt'>
    readonly dokterId: FieldRef<"Pendaftaran", 'BigInt'>
    readonly diterimaOlehDokterId: FieldRef<"Pendaftaran", 'BigInt'>
    readonly nama: FieldRef<"Pendaftaran", 'String'>
    readonly tanggalLahir: FieldRef<"Pendaftaran", 'DateTime'>
    readonly jenisKelamin: FieldRef<"Pendaftaran", 'String'>
    readonly noHp: FieldRef<"Pendaftaran", 'String'>
    readonly nik: FieldRef<"Pendaftaran", 'String'>
    readonly keluhan: FieldRef<"Pendaftaran", 'String'>
    readonly tanggalKunjungan: FieldRef<"Pendaftaran", 'DateTime'>
    readonly jamKunjungan: FieldRef<"Pendaftaran", 'DateTime'>
    readonly spesialis: FieldRef<"Pendaftaran", 'String'>
    readonly status: FieldRef<"Pendaftaran", 'String'>
    readonly nomorUrut: FieldRef<"Pendaftaran", 'Int'>
    readonly kodeAntrian: FieldRef<"Pendaftaran", 'String'>
    readonly qrToken: FieldRef<"Pendaftaran", 'String'>
    readonly qrPath: FieldRef<"Pendaftaran", 'String'>
    readonly checkinAt: FieldRef<"Pendaftaran", 'DateTime'>
    readonly checkedInAt: FieldRef<"Pendaftaran", 'DateTime'>
    readonly checkedInBy: FieldRef<"Pendaftaran", 'BigInt'>
    readonly noShowAt: FieldRef<"Pendaftaran", 'DateTime'>
    readonly noShowBy: FieldRef<"Pendaftaran", 'BigInt'>
    readonly createdAt: FieldRef<"Pendaftaran", 'DateTime'>
    readonly updatedAt: FieldRef<"Pendaftaran", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pendaftaran findUnique
   */
  export type PendaftaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran findUniqueOrThrow
   */
  export type PendaftaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran findFirst
   */
  export type PendaftaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pendaftarans.
     */
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran findFirstOrThrow
   */
  export type PendaftaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pendaftarans.
     */
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran findMany
   */
  export type PendaftaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter, which Pendaftarans to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran create
   */
  export type PendaftaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * The data needed to create a Pendaftaran.
     */
    data: XOR<PendaftaranCreateInput, PendaftaranUncheckedCreateInput>
  }

  /**
   * Pendaftaran createMany
   */
  export type PendaftaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pendaftarans.
     */
    data: PendaftaranCreateManyInput | PendaftaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pendaftaran createManyAndReturn
   */
  export type PendaftaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data used to create many Pendaftarans.
     */
    data: PendaftaranCreateManyInput | PendaftaranCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pendaftaran update
   */
  export type PendaftaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * The data needed to update a Pendaftaran.
     */
    data: XOR<PendaftaranUpdateInput, PendaftaranUncheckedUpdateInput>
    /**
     * Choose, which Pendaftaran to update.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran updateMany
   */
  export type PendaftaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pendaftarans.
     */
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyInput>
    /**
     * Filter which Pendaftarans to update
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to update.
     */
    limit?: number
  }

  /**
   * Pendaftaran updateManyAndReturn
   */
  export type PendaftaranUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data used to update Pendaftarans.
     */
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyInput>
    /**
     * Filter which Pendaftarans to update
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pendaftaran upsert
   */
  export type PendaftaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * The filter to search for the Pendaftaran to update in case it exists.
     */
    where: PendaftaranWhereUniqueInput
    /**
     * In case the Pendaftaran found by the `where` argument doesn't exist, create a new Pendaftaran with this data.
     */
    create: XOR<PendaftaranCreateInput, PendaftaranUncheckedCreateInput>
    /**
     * In case the Pendaftaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendaftaranUpdateInput, PendaftaranUncheckedUpdateInput>
  }

  /**
   * Pendaftaran delete
   */
  export type PendaftaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
    /**
     * Filter which Pendaftaran to delete.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran deleteMany
   */
  export type PendaftaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pendaftarans to delete
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to delete.
     */
    limit?: number
  }

  /**
   * Pendaftaran.dokter
   */
  export type Pendaftaran$dokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Pendaftaran.diterimaOlehDokter
   */
  export type Pendaftaran$diterimaOlehDokterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Pendaftaran.rekamMedis
   */
  export type Pendaftaran$rekamMedisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    where?: RekamMedisWhereInput
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    cursor?: RekamMedisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * Pendaftaran without action
   */
  export type PendaftaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendaftaranInclude<ExtArgs> | null
  }


  /**
   * Model RekamMedis
   */

  export type AggregateRekamMedis = {
    _count: RekamMedisCountAggregateOutputType | null
    _avg: RekamMedisAvgAggregateOutputType | null
    _sum: RekamMedisSumAggregateOutputType | null
    _min: RekamMedisMinAggregateOutputType | null
    _max: RekamMedisMaxAggregateOutputType | null
  }

  export type RekamMedisAvgAggregateOutputType = {
    id: number | null
    pendaftaranId: number | null
    pasienId: number | null
    dokterId: number | null
    chainIndex: number | null
  }

  export type RekamMedisSumAggregateOutputType = {
    id: bigint | null
    pendaftaranId: bigint | null
    pasienId: bigint | null
    dokterId: bigint | null
    chainIndex: number | null
  }

  export type RekamMedisMinAggregateOutputType = {
    id: bigint | null
    pendaftaranId: bigint | null
    pasienId: bigint | null
    dokterId: bigint | null
    tanggal: Date | null
    diagnosa: string | null
    tindakan: string | null
    resep: string | null
    catatan: string | null
    chainIndex: number | null
    prevHash: string | null
    blockHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RekamMedisMaxAggregateOutputType = {
    id: bigint | null
    pendaftaranId: bigint | null
    pasienId: bigint | null
    dokterId: bigint | null
    tanggal: Date | null
    diagnosa: string | null
    tindakan: string | null
    resep: string | null
    catatan: string | null
    chainIndex: number | null
    prevHash: string | null
    blockHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RekamMedisCountAggregateOutputType = {
    id: number
    pendaftaranId: number
    pasienId: number
    dokterId: number
    tanggal: number
    diagnosa: number
    tindakan: number
    resep: number
    catatan: number
    chainIndex: number
    prevHash: number
    blockHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RekamMedisAvgAggregateInputType = {
    id?: true
    pendaftaranId?: true
    pasienId?: true
    dokterId?: true
    chainIndex?: true
  }

  export type RekamMedisSumAggregateInputType = {
    id?: true
    pendaftaranId?: true
    pasienId?: true
    dokterId?: true
    chainIndex?: true
  }

  export type RekamMedisMinAggregateInputType = {
    id?: true
    pendaftaranId?: true
    pasienId?: true
    dokterId?: true
    tanggal?: true
    diagnosa?: true
    tindakan?: true
    resep?: true
    catatan?: true
    chainIndex?: true
    prevHash?: true
    blockHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RekamMedisMaxAggregateInputType = {
    id?: true
    pendaftaranId?: true
    pasienId?: true
    dokterId?: true
    tanggal?: true
    diagnosa?: true
    tindakan?: true
    resep?: true
    catatan?: true
    chainIndex?: true
    prevHash?: true
    blockHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RekamMedisCountAggregateInputType = {
    id?: true
    pendaftaranId?: true
    pasienId?: true
    dokterId?: true
    tanggal?: true
    diagnosa?: true
    tindakan?: true
    resep?: true
    catatan?: true
    chainIndex?: true
    prevHash?: true
    blockHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RekamMedisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RekamMedis to aggregate.
     */
    where?: RekamMedisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekamMedis to fetch.
     */
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RekamMedisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekamMedis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekamMedis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RekamMedis
    **/
    _count?: true | RekamMedisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RekamMedisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RekamMedisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RekamMedisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RekamMedisMaxAggregateInputType
  }

  export type GetRekamMedisAggregateType<T extends RekamMedisAggregateArgs> = {
        [P in keyof T & keyof AggregateRekamMedis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRekamMedis[P]>
      : GetScalarType<T[P], AggregateRekamMedis[P]>
  }




  export type RekamMedisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekamMedisWhereInput
    orderBy?: RekamMedisOrderByWithAggregationInput | RekamMedisOrderByWithAggregationInput[]
    by: RekamMedisScalarFieldEnum[] | RekamMedisScalarFieldEnum
    having?: RekamMedisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RekamMedisCountAggregateInputType | true
    _avg?: RekamMedisAvgAggregateInputType
    _sum?: RekamMedisSumAggregateInputType
    _min?: RekamMedisMinAggregateInputType
    _max?: RekamMedisMaxAggregateInputType
  }

  export type RekamMedisGroupByOutputType = {
    id: bigint
    pendaftaranId: bigint
    pasienId: bigint | null
    dokterId: bigint
    tanggal: Date | null
    diagnosa: string
    tindakan: string
    resep: string | null
    catatan: string | null
    chainIndex: number | null
    prevHash: string | null
    blockHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: RekamMedisCountAggregateOutputType | null
    _avg: RekamMedisAvgAggregateOutputType | null
    _sum: RekamMedisSumAggregateOutputType | null
    _min: RekamMedisMinAggregateOutputType | null
    _max: RekamMedisMaxAggregateOutputType | null
  }

  type GetRekamMedisGroupByPayload<T extends RekamMedisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RekamMedisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RekamMedisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RekamMedisGroupByOutputType[P]>
            : GetScalarType<T[P], RekamMedisGroupByOutputType[P]>
        }
      >
    >


  export type RekamMedisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pendaftaranId?: boolean
    pasienId?: boolean
    dokterId?: boolean
    tanggal?: boolean
    diagnosa?: boolean
    tindakan?: boolean
    resep?: boolean
    catatan?: boolean
    chainIndex?: boolean
    prevHash?: boolean
    blockHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekamMedis"]>

  export type RekamMedisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pendaftaranId?: boolean
    pasienId?: boolean
    dokterId?: boolean
    tanggal?: boolean
    diagnosa?: boolean
    tindakan?: boolean
    resep?: boolean
    catatan?: boolean
    chainIndex?: boolean
    prevHash?: boolean
    blockHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekamMedis"]>

  export type RekamMedisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pendaftaranId?: boolean
    pasienId?: boolean
    dokterId?: boolean
    tanggal?: boolean
    diagnosa?: boolean
    tindakan?: boolean
    resep?: boolean
    catatan?: boolean
    chainIndex?: boolean
    prevHash?: boolean
    blockHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekamMedis"]>

  export type RekamMedisSelectScalar = {
    id?: boolean
    pendaftaranId?: boolean
    pasienId?: boolean
    dokterId?: boolean
    tanggal?: boolean
    diagnosa?: boolean
    tindakan?: boolean
    resep?: boolean
    catatan?: boolean
    chainIndex?: boolean
    prevHash?: boolean
    blockHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RekamMedisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pendaftaranId" | "pasienId" | "dokterId" | "tanggal" | "diagnosa" | "tindakan" | "resep" | "catatan" | "chainIndex" | "prevHash" | "blockHash" | "createdAt" | "updatedAt", ExtArgs["result"]["rekamMedis"]>
  export type RekamMedisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }
  export type RekamMedisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }
  export type RekamMedisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
    pasien?: boolean | RekamMedis$pasienArgs<ExtArgs>
    pendaftaran?: boolean | PendaftaranDefaultArgs<ExtArgs>
  }

  export type $RekamMedisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RekamMedis"
    objects: {
      dokter: Prisma.$UserPayload<ExtArgs>
      pasien: Prisma.$UserPayload<ExtArgs> | null
      pendaftaran: Prisma.$PendaftaranPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      pendaftaranId: bigint
      pasienId: bigint | null
      dokterId: bigint
      tanggal: Date | null
      diagnosa: string
      tindakan: string
      resep: string | null
      catatan: string | null
      chainIndex: number | null
      prevHash: string | null
      blockHash: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["rekamMedis"]>
    composites: {}
  }

  type RekamMedisGetPayload<S extends boolean | null | undefined | RekamMedisDefaultArgs> = $Result.GetResult<Prisma.$RekamMedisPayload, S>

  type RekamMedisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RekamMedisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RekamMedisCountAggregateInputType | true
    }

  export interface RekamMedisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RekamMedis'], meta: { name: 'RekamMedis' } }
    /**
     * Find zero or one RekamMedis that matches the filter.
     * @param {RekamMedisFindUniqueArgs} args - Arguments to find a RekamMedis
     * @example
     * // Get one RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RekamMedisFindUniqueArgs>(args: SelectSubset<T, RekamMedisFindUniqueArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RekamMedis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RekamMedisFindUniqueOrThrowArgs} args - Arguments to find a RekamMedis
     * @example
     * // Get one RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RekamMedisFindUniqueOrThrowArgs>(args: SelectSubset<T, RekamMedisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RekamMedis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisFindFirstArgs} args - Arguments to find a RekamMedis
     * @example
     * // Get one RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RekamMedisFindFirstArgs>(args?: SelectSubset<T, RekamMedisFindFirstArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RekamMedis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisFindFirstOrThrowArgs} args - Arguments to find a RekamMedis
     * @example
     * // Get one RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RekamMedisFindFirstOrThrowArgs>(args?: SelectSubset<T, RekamMedisFindFirstOrThrowArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RekamMedis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findMany()
     * 
     * // Get first 10 RekamMedis
     * const rekamMedis = await prisma.rekamMedis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rekamMedisWithIdOnly = await prisma.rekamMedis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RekamMedisFindManyArgs>(args?: SelectSubset<T, RekamMedisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RekamMedis.
     * @param {RekamMedisCreateArgs} args - Arguments to create a RekamMedis.
     * @example
     * // Create one RekamMedis
     * const RekamMedis = await prisma.rekamMedis.create({
     *   data: {
     *     // ... data to create a RekamMedis
     *   }
     * })
     * 
     */
    create<T extends RekamMedisCreateArgs>(args: SelectSubset<T, RekamMedisCreateArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RekamMedis.
     * @param {RekamMedisCreateManyArgs} args - Arguments to create many RekamMedis.
     * @example
     * // Create many RekamMedis
     * const rekamMedis = await prisma.rekamMedis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RekamMedisCreateManyArgs>(args?: SelectSubset<T, RekamMedisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RekamMedis and returns the data saved in the database.
     * @param {RekamMedisCreateManyAndReturnArgs} args - Arguments to create many RekamMedis.
     * @example
     * // Create many RekamMedis
     * const rekamMedis = await prisma.rekamMedis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RekamMedis and only return the `id`
     * const rekamMedisWithIdOnly = await prisma.rekamMedis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RekamMedisCreateManyAndReturnArgs>(args?: SelectSubset<T, RekamMedisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RekamMedis.
     * @param {RekamMedisDeleteArgs} args - Arguments to delete one RekamMedis.
     * @example
     * // Delete one RekamMedis
     * const RekamMedis = await prisma.rekamMedis.delete({
     *   where: {
     *     // ... filter to delete one RekamMedis
     *   }
     * })
     * 
     */
    delete<T extends RekamMedisDeleteArgs>(args: SelectSubset<T, RekamMedisDeleteArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RekamMedis.
     * @param {RekamMedisUpdateArgs} args - Arguments to update one RekamMedis.
     * @example
     * // Update one RekamMedis
     * const rekamMedis = await prisma.rekamMedis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RekamMedisUpdateArgs>(args: SelectSubset<T, RekamMedisUpdateArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RekamMedis.
     * @param {RekamMedisDeleteManyArgs} args - Arguments to filter RekamMedis to delete.
     * @example
     * // Delete a few RekamMedis
     * const { count } = await prisma.rekamMedis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RekamMedisDeleteManyArgs>(args?: SelectSubset<T, RekamMedisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RekamMedis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RekamMedis
     * const rekamMedis = await prisma.rekamMedis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RekamMedisUpdateManyArgs>(args: SelectSubset<T, RekamMedisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RekamMedis and returns the data updated in the database.
     * @param {RekamMedisUpdateManyAndReturnArgs} args - Arguments to update many RekamMedis.
     * @example
     * // Update many RekamMedis
     * const rekamMedis = await prisma.rekamMedis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RekamMedis and only return the `id`
     * const rekamMedisWithIdOnly = await prisma.rekamMedis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RekamMedisUpdateManyAndReturnArgs>(args: SelectSubset<T, RekamMedisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RekamMedis.
     * @param {RekamMedisUpsertArgs} args - Arguments to update or create a RekamMedis.
     * @example
     * // Update or create a RekamMedis
     * const rekamMedis = await prisma.rekamMedis.upsert({
     *   create: {
     *     // ... data to create a RekamMedis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RekamMedis we want to update
     *   }
     * })
     */
    upsert<T extends RekamMedisUpsertArgs>(args: SelectSubset<T, RekamMedisUpsertArgs<ExtArgs>>): Prisma__RekamMedisClient<$Result.GetResult<Prisma.$RekamMedisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RekamMedis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisCountArgs} args - Arguments to filter RekamMedis to count.
     * @example
     * // Count the number of RekamMedis
     * const count = await prisma.rekamMedis.count({
     *   where: {
     *     // ... the filter for the RekamMedis we want to count
     *   }
     * })
    **/
    count<T extends RekamMedisCountArgs>(
      args?: Subset<T, RekamMedisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RekamMedisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RekamMedis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RekamMedisAggregateArgs>(args: Subset<T, RekamMedisAggregateArgs>): Prisma.PrismaPromise<GetRekamMedisAggregateType<T>>

    /**
     * Group by RekamMedis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekamMedisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RekamMedisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RekamMedisGroupByArgs['orderBy'] }
        : { orderBy?: RekamMedisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RekamMedisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRekamMedisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RekamMedis model
   */
  readonly fields: RekamMedisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RekamMedis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RekamMedisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dokter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pasien<T extends RekamMedis$pasienArgs<ExtArgs> = {}>(args?: Subset<T, RekamMedis$pasienArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pendaftaran<T extends PendaftaranDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PendaftaranDefaultArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RekamMedis model
   */
  interface RekamMedisFieldRefs {
    readonly id: FieldRef<"RekamMedis", 'BigInt'>
    readonly pendaftaranId: FieldRef<"RekamMedis", 'BigInt'>
    readonly pasienId: FieldRef<"RekamMedis", 'BigInt'>
    readonly dokterId: FieldRef<"RekamMedis", 'BigInt'>
    readonly tanggal: FieldRef<"RekamMedis", 'DateTime'>
    readonly diagnosa: FieldRef<"RekamMedis", 'String'>
    readonly tindakan: FieldRef<"RekamMedis", 'String'>
    readonly resep: FieldRef<"RekamMedis", 'String'>
    readonly catatan: FieldRef<"RekamMedis", 'String'>
    readonly chainIndex: FieldRef<"RekamMedis", 'Int'>
    readonly prevHash: FieldRef<"RekamMedis", 'String'>
    readonly blockHash: FieldRef<"RekamMedis", 'String'>
    readonly createdAt: FieldRef<"RekamMedis", 'DateTime'>
    readonly updatedAt: FieldRef<"RekamMedis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RekamMedis findUnique
   */
  export type RekamMedisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter, which RekamMedis to fetch.
     */
    where: RekamMedisWhereUniqueInput
  }

  /**
   * RekamMedis findUniqueOrThrow
   */
  export type RekamMedisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter, which RekamMedis to fetch.
     */
    where: RekamMedisWhereUniqueInput
  }

  /**
   * RekamMedis findFirst
   */
  export type RekamMedisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter, which RekamMedis to fetch.
     */
    where?: RekamMedisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekamMedis to fetch.
     */
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RekamMedis.
     */
    cursor?: RekamMedisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekamMedis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekamMedis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RekamMedis.
     */
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * RekamMedis findFirstOrThrow
   */
  export type RekamMedisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter, which RekamMedis to fetch.
     */
    where?: RekamMedisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekamMedis to fetch.
     */
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RekamMedis.
     */
    cursor?: RekamMedisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekamMedis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekamMedis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RekamMedis.
     */
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * RekamMedis findMany
   */
  export type RekamMedisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter, which RekamMedis to fetch.
     */
    where?: RekamMedisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekamMedis to fetch.
     */
    orderBy?: RekamMedisOrderByWithRelationInput | RekamMedisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RekamMedis.
     */
    cursor?: RekamMedisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekamMedis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekamMedis.
     */
    skip?: number
    distinct?: RekamMedisScalarFieldEnum | RekamMedisScalarFieldEnum[]
  }

  /**
   * RekamMedis create
   */
  export type RekamMedisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * The data needed to create a RekamMedis.
     */
    data: XOR<RekamMedisCreateInput, RekamMedisUncheckedCreateInput>
  }

  /**
   * RekamMedis createMany
   */
  export type RekamMedisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RekamMedis.
     */
    data: RekamMedisCreateManyInput | RekamMedisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RekamMedis createManyAndReturn
   */
  export type RekamMedisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * The data used to create many RekamMedis.
     */
    data: RekamMedisCreateManyInput | RekamMedisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RekamMedis update
   */
  export type RekamMedisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * The data needed to update a RekamMedis.
     */
    data: XOR<RekamMedisUpdateInput, RekamMedisUncheckedUpdateInput>
    /**
     * Choose, which RekamMedis to update.
     */
    where: RekamMedisWhereUniqueInput
  }

  /**
   * RekamMedis updateMany
   */
  export type RekamMedisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RekamMedis.
     */
    data: XOR<RekamMedisUpdateManyMutationInput, RekamMedisUncheckedUpdateManyInput>
    /**
     * Filter which RekamMedis to update
     */
    where?: RekamMedisWhereInput
    /**
     * Limit how many RekamMedis to update.
     */
    limit?: number
  }

  /**
   * RekamMedis updateManyAndReturn
   */
  export type RekamMedisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * The data used to update RekamMedis.
     */
    data: XOR<RekamMedisUpdateManyMutationInput, RekamMedisUncheckedUpdateManyInput>
    /**
     * Filter which RekamMedis to update
     */
    where?: RekamMedisWhereInput
    /**
     * Limit how many RekamMedis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RekamMedis upsert
   */
  export type RekamMedisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * The filter to search for the RekamMedis to update in case it exists.
     */
    where: RekamMedisWhereUniqueInput
    /**
     * In case the RekamMedis found by the `where` argument doesn't exist, create a new RekamMedis with this data.
     */
    create: XOR<RekamMedisCreateInput, RekamMedisUncheckedCreateInput>
    /**
     * In case the RekamMedis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RekamMedisUpdateInput, RekamMedisUncheckedUpdateInput>
  }

  /**
   * RekamMedis delete
   */
  export type RekamMedisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
    /**
     * Filter which RekamMedis to delete.
     */
    where: RekamMedisWhereUniqueInput
  }

  /**
   * RekamMedis deleteMany
   */
  export type RekamMedisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RekamMedis to delete
     */
    where?: RekamMedisWhereInput
    /**
     * Limit how many RekamMedis to delete.
     */
    limit?: number
  }

  /**
   * RekamMedis.pasien
   */
  export type RekamMedis$pasienArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RekamMedis without action
   */
  export type RekamMedisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekamMedis
     */
    select?: RekamMedisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekamMedis
     */
    omit?: RekamMedisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekamMedisInclude<ExtArgs> | null
  }


  /**
   * Model JadwalDokter
   */

  export type AggregateJadwalDokter = {
    _count: JadwalDokterCountAggregateOutputType | null
    _avg: JadwalDokterAvgAggregateOutputType | null
    _sum: JadwalDokterSumAggregateOutputType | null
    _min: JadwalDokterMinAggregateOutputType | null
    _max: JadwalDokterMaxAggregateOutputType | null
  }

  export type JadwalDokterAvgAggregateOutputType = {
    id: number | null
    dokterId: number | null
    pasienId: number | null
  }

  export type JadwalDokterSumAggregateOutputType = {
    id: bigint | null
    dokterId: bigint | null
    pasienId: bigint | null
  }

  export type JadwalDokterMinAggregateOutputType = {
    id: bigint | null
    dokterId: bigint | null
    pasienId: bigint | null
    hari: string | null
    jamMulai: Date | null
    jamSelesai: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JadwalDokterMaxAggregateOutputType = {
    id: bigint | null
    dokterId: bigint | null
    pasienId: bigint | null
    hari: string | null
    jamMulai: Date | null
    jamSelesai: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JadwalDokterCountAggregateOutputType = {
    id: number
    dokterId: number
    pasienId: number
    hari: number
    jamMulai: number
    jamSelesai: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JadwalDokterAvgAggregateInputType = {
    id?: true
    dokterId?: true
    pasienId?: true
  }

  export type JadwalDokterSumAggregateInputType = {
    id?: true
    dokterId?: true
    pasienId?: true
  }

  export type JadwalDokterMinAggregateInputType = {
    id?: true
    dokterId?: true
    pasienId?: true
    hari?: true
    jamMulai?: true
    jamSelesai?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JadwalDokterMaxAggregateInputType = {
    id?: true
    dokterId?: true
    pasienId?: true
    hari?: true
    jamMulai?: true
    jamSelesai?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JadwalDokterCountAggregateInputType = {
    id?: true
    dokterId?: true
    pasienId?: true
    hari?: true
    jamMulai?: true
    jamSelesai?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JadwalDokterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JadwalDokter to aggregate.
     */
    where?: JadwalDokterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalDokters to fetch.
     */
    orderBy?: JadwalDokterOrderByWithRelationInput | JadwalDokterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JadwalDokterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalDokters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalDokters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JadwalDokters
    **/
    _count?: true | JadwalDokterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JadwalDokterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JadwalDokterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JadwalDokterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JadwalDokterMaxAggregateInputType
  }

  export type GetJadwalDokterAggregateType<T extends JadwalDokterAggregateArgs> = {
        [P in keyof T & keyof AggregateJadwalDokter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJadwalDokter[P]>
      : GetScalarType<T[P], AggregateJadwalDokter[P]>
  }




  export type JadwalDokterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalDokterWhereInput
    orderBy?: JadwalDokterOrderByWithAggregationInput | JadwalDokterOrderByWithAggregationInput[]
    by: JadwalDokterScalarFieldEnum[] | JadwalDokterScalarFieldEnum
    having?: JadwalDokterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JadwalDokterCountAggregateInputType | true
    _avg?: JadwalDokterAvgAggregateInputType
    _sum?: JadwalDokterSumAggregateInputType
    _min?: JadwalDokterMinAggregateInputType
    _max?: JadwalDokterMaxAggregateInputType
  }

  export type JadwalDokterGroupByOutputType = {
    id: bigint
    dokterId: bigint
    pasienId: bigint | null
    hari: string
    jamMulai: Date
    jamSelesai: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: JadwalDokterCountAggregateOutputType | null
    _avg: JadwalDokterAvgAggregateOutputType | null
    _sum: JadwalDokterSumAggregateOutputType | null
    _min: JadwalDokterMinAggregateOutputType | null
    _max: JadwalDokterMaxAggregateOutputType | null
  }

  type GetJadwalDokterGroupByPayload<T extends JadwalDokterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JadwalDokterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JadwalDokterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JadwalDokterGroupByOutputType[P]>
            : GetScalarType<T[P], JadwalDokterGroupByOutputType[P]>
        }
      >
    >


  export type JadwalDokterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dokterId?: boolean
    pasienId?: boolean
    hari?: boolean
    jamMulai?: boolean
    jamSelesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalDokter"]>

  export type JadwalDokterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dokterId?: boolean
    pasienId?: boolean
    hari?: boolean
    jamMulai?: boolean
    jamSelesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalDokter"]>

  export type JadwalDokterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dokterId?: boolean
    pasienId?: boolean
    hari?: boolean
    jamMulai?: boolean
    jamSelesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalDokter"]>

  export type JadwalDokterSelectScalar = {
    id?: boolean
    dokterId?: boolean
    pasienId?: boolean
    hari?: boolean
    jamMulai?: boolean
    jamSelesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JadwalDokterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dokterId" | "pasienId" | "hari" | "jamMulai" | "jamSelesai" | "createdAt" | "updatedAt", ExtArgs["result"]["jadwalDokter"]>
  export type JadwalDokterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalDokterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalDokterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dokter?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JadwalDokterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JadwalDokter"
    objects: {
      dokter: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      dokterId: bigint
      pasienId: bigint | null
      hari: string
      jamMulai: Date
      jamSelesai: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["jadwalDokter"]>
    composites: {}
  }

  type JadwalDokterGetPayload<S extends boolean | null | undefined | JadwalDokterDefaultArgs> = $Result.GetResult<Prisma.$JadwalDokterPayload, S>

  type JadwalDokterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JadwalDokterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JadwalDokterCountAggregateInputType | true
    }

  export interface JadwalDokterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JadwalDokter'], meta: { name: 'JadwalDokter' } }
    /**
     * Find zero or one JadwalDokter that matches the filter.
     * @param {JadwalDokterFindUniqueArgs} args - Arguments to find a JadwalDokter
     * @example
     * // Get one JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JadwalDokterFindUniqueArgs>(args: SelectSubset<T, JadwalDokterFindUniqueArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JadwalDokter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JadwalDokterFindUniqueOrThrowArgs} args - Arguments to find a JadwalDokter
     * @example
     * // Get one JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JadwalDokterFindUniqueOrThrowArgs>(args: SelectSubset<T, JadwalDokterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JadwalDokter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterFindFirstArgs} args - Arguments to find a JadwalDokter
     * @example
     * // Get one JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JadwalDokterFindFirstArgs>(args?: SelectSubset<T, JadwalDokterFindFirstArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JadwalDokter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterFindFirstOrThrowArgs} args - Arguments to find a JadwalDokter
     * @example
     * // Get one JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JadwalDokterFindFirstOrThrowArgs>(args?: SelectSubset<T, JadwalDokterFindFirstOrThrowArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JadwalDokters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JadwalDokters
     * const jadwalDokters = await prisma.jadwalDokter.findMany()
     * 
     * // Get first 10 JadwalDokters
     * const jadwalDokters = await prisma.jadwalDokter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jadwalDokterWithIdOnly = await prisma.jadwalDokter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JadwalDokterFindManyArgs>(args?: SelectSubset<T, JadwalDokterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JadwalDokter.
     * @param {JadwalDokterCreateArgs} args - Arguments to create a JadwalDokter.
     * @example
     * // Create one JadwalDokter
     * const JadwalDokter = await prisma.jadwalDokter.create({
     *   data: {
     *     // ... data to create a JadwalDokter
     *   }
     * })
     * 
     */
    create<T extends JadwalDokterCreateArgs>(args: SelectSubset<T, JadwalDokterCreateArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JadwalDokters.
     * @param {JadwalDokterCreateManyArgs} args - Arguments to create many JadwalDokters.
     * @example
     * // Create many JadwalDokters
     * const jadwalDokter = await prisma.jadwalDokter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JadwalDokterCreateManyArgs>(args?: SelectSubset<T, JadwalDokterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JadwalDokters and returns the data saved in the database.
     * @param {JadwalDokterCreateManyAndReturnArgs} args - Arguments to create many JadwalDokters.
     * @example
     * // Create many JadwalDokters
     * const jadwalDokter = await prisma.jadwalDokter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JadwalDokters and only return the `id`
     * const jadwalDokterWithIdOnly = await prisma.jadwalDokter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JadwalDokterCreateManyAndReturnArgs>(args?: SelectSubset<T, JadwalDokterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JadwalDokter.
     * @param {JadwalDokterDeleteArgs} args - Arguments to delete one JadwalDokter.
     * @example
     * // Delete one JadwalDokter
     * const JadwalDokter = await prisma.jadwalDokter.delete({
     *   where: {
     *     // ... filter to delete one JadwalDokter
     *   }
     * })
     * 
     */
    delete<T extends JadwalDokterDeleteArgs>(args: SelectSubset<T, JadwalDokterDeleteArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JadwalDokter.
     * @param {JadwalDokterUpdateArgs} args - Arguments to update one JadwalDokter.
     * @example
     * // Update one JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JadwalDokterUpdateArgs>(args: SelectSubset<T, JadwalDokterUpdateArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JadwalDokters.
     * @param {JadwalDokterDeleteManyArgs} args - Arguments to filter JadwalDokters to delete.
     * @example
     * // Delete a few JadwalDokters
     * const { count } = await prisma.jadwalDokter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JadwalDokterDeleteManyArgs>(args?: SelectSubset<T, JadwalDokterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JadwalDokters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JadwalDokters
     * const jadwalDokter = await prisma.jadwalDokter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JadwalDokterUpdateManyArgs>(args: SelectSubset<T, JadwalDokterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JadwalDokters and returns the data updated in the database.
     * @param {JadwalDokterUpdateManyAndReturnArgs} args - Arguments to update many JadwalDokters.
     * @example
     * // Update many JadwalDokters
     * const jadwalDokter = await prisma.jadwalDokter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JadwalDokters and only return the `id`
     * const jadwalDokterWithIdOnly = await prisma.jadwalDokter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JadwalDokterUpdateManyAndReturnArgs>(args: SelectSubset<T, JadwalDokterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JadwalDokter.
     * @param {JadwalDokterUpsertArgs} args - Arguments to update or create a JadwalDokter.
     * @example
     * // Update or create a JadwalDokter
     * const jadwalDokter = await prisma.jadwalDokter.upsert({
     *   create: {
     *     // ... data to create a JadwalDokter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JadwalDokter we want to update
     *   }
     * })
     */
    upsert<T extends JadwalDokterUpsertArgs>(args: SelectSubset<T, JadwalDokterUpsertArgs<ExtArgs>>): Prisma__JadwalDokterClient<$Result.GetResult<Prisma.$JadwalDokterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JadwalDokters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterCountArgs} args - Arguments to filter JadwalDokters to count.
     * @example
     * // Count the number of JadwalDokters
     * const count = await prisma.jadwalDokter.count({
     *   where: {
     *     // ... the filter for the JadwalDokters we want to count
     *   }
     * })
    **/
    count<T extends JadwalDokterCountArgs>(
      args?: Subset<T, JadwalDokterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JadwalDokterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JadwalDokter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JadwalDokterAggregateArgs>(args: Subset<T, JadwalDokterAggregateArgs>): Prisma.PrismaPromise<GetJadwalDokterAggregateType<T>>

    /**
     * Group by JadwalDokter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalDokterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JadwalDokterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JadwalDokterGroupByArgs['orderBy'] }
        : { orderBy?: JadwalDokterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JadwalDokterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJadwalDokterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JadwalDokter model
   */
  readonly fields: JadwalDokterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JadwalDokter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JadwalDokterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dokter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JadwalDokter model
   */
  interface JadwalDokterFieldRefs {
    readonly id: FieldRef<"JadwalDokter", 'BigInt'>
    readonly dokterId: FieldRef<"JadwalDokter", 'BigInt'>
    readonly pasienId: FieldRef<"JadwalDokter", 'BigInt'>
    readonly hari: FieldRef<"JadwalDokter", 'String'>
    readonly jamMulai: FieldRef<"JadwalDokter", 'DateTime'>
    readonly jamSelesai: FieldRef<"JadwalDokter", 'DateTime'>
    readonly createdAt: FieldRef<"JadwalDokter", 'DateTime'>
    readonly updatedAt: FieldRef<"JadwalDokter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JadwalDokter findUnique
   */
  export type JadwalDokterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter, which JadwalDokter to fetch.
     */
    where: JadwalDokterWhereUniqueInput
  }

  /**
   * JadwalDokter findUniqueOrThrow
   */
  export type JadwalDokterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter, which JadwalDokter to fetch.
     */
    where: JadwalDokterWhereUniqueInput
  }

  /**
   * JadwalDokter findFirst
   */
  export type JadwalDokterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter, which JadwalDokter to fetch.
     */
    where?: JadwalDokterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalDokters to fetch.
     */
    orderBy?: JadwalDokterOrderByWithRelationInput | JadwalDokterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JadwalDokters.
     */
    cursor?: JadwalDokterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalDokters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalDokters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JadwalDokters.
     */
    distinct?: JadwalDokterScalarFieldEnum | JadwalDokterScalarFieldEnum[]
  }

  /**
   * JadwalDokter findFirstOrThrow
   */
  export type JadwalDokterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter, which JadwalDokter to fetch.
     */
    where?: JadwalDokterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalDokters to fetch.
     */
    orderBy?: JadwalDokterOrderByWithRelationInput | JadwalDokterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JadwalDokters.
     */
    cursor?: JadwalDokterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalDokters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalDokters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JadwalDokters.
     */
    distinct?: JadwalDokterScalarFieldEnum | JadwalDokterScalarFieldEnum[]
  }

  /**
   * JadwalDokter findMany
   */
  export type JadwalDokterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter, which JadwalDokters to fetch.
     */
    where?: JadwalDokterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalDokters to fetch.
     */
    orderBy?: JadwalDokterOrderByWithRelationInput | JadwalDokterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JadwalDokters.
     */
    cursor?: JadwalDokterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalDokters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalDokters.
     */
    skip?: number
    distinct?: JadwalDokterScalarFieldEnum | JadwalDokterScalarFieldEnum[]
  }

  /**
   * JadwalDokter create
   */
  export type JadwalDokterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * The data needed to create a JadwalDokter.
     */
    data: XOR<JadwalDokterCreateInput, JadwalDokterUncheckedCreateInput>
  }

  /**
   * JadwalDokter createMany
   */
  export type JadwalDokterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JadwalDokters.
     */
    data: JadwalDokterCreateManyInput | JadwalDokterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JadwalDokter createManyAndReturn
   */
  export type JadwalDokterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * The data used to create many JadwalDokters.
     */
    data: JadwalDokterCreateManyInput | JadwalDokterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JadwalDokter update
   */
  export type JadwalDokterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * The data needed to update a JadwalDokter.
     */
    data: XOR<JadwalDokterUpdateInput, JadwalDokterUncheckedUpdateInput>
    /**
     * Choose, which JadwalDokter to update.
     */
    where: JadwalDokterWhereUniqueInput
  }

  /**
   * JadwalDokter updateMany
   */
  export type JadwalDokterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JadwalDokters.
     */
    data: XOR<JadwalDokterUpdateManyMutationInput, JadwalDokterUncheckedUpdateManyInput>
    /**
     * Filter which JadwalDokters to update
     */
    where?: JadwalDokterWhereInput
    /**
     * Limit how many JadwalDokters to update.
     */
    limit?: number
  }

  /**
   * JadwalDokter updateManyAndReturn
   */
  export type JadwalDokterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * The data used to update JadwalDokters.
     */
    data: XOR<JadwalDokterUpdateManyMutationInput, JadwalDokterUncheckedUpdateManyInput>
    /**
     * Filter which JadwalDokters to update
     */
    where?: JadwalDokterWhereInput
    /**
     * Limit how many JadwalDokters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JadwalDokter upsert
   */
  export type JadwalDokterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * The filter to search for the JadwalDokter to update in case it exists.
     */
    where: JadwalDokterWhereUniqueInput
    /**
     * In case the JadwalDokter found by the `where` argument doesn't exist, create a new JadwalDokter with this data.
     */
    create: XOR<JadwalDokterCreateInput, JadwalDokterUncheckedCreateInput>
    /**
     * In case the JadwalDokter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JadwalDokterUpdateInput, JadwalDokterUncheckedUpdateInput>
  }

  /**
   * JadwalDokter delete
   */
  export type JadwalDokterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
    /**
     * Filter which JadwalDokter to delete.
     */
    where: JadwalDokterWhereUniqueInput
  }

  /**
   * JadwalDokter deleteMany
   */
  export type JadwalDokterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JadwalDokters to delete
     */
    where?: JadwalDokterWhereInput
    /**
     * Limit how many JadwalDokters to delete.
     */
    limit?: number
  }

  /**
   * JadwalDokter without action
   */
  export type JadwalDokterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalDokter
     */
    select?: JadwalDokterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalDokter
     */
    omit?: JadwalDokterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalDokterInclude<ExtArgs> | null
  }


  /**
   * Model Pembayaran
   */

  export type AggregatePembayaran = {
    _count: PembayaranCountAggregateOutputType | null
    _avg: PembayaranAvgAggregateOutputType | null
    _sum: PembayaranSumAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  export type PembayaranAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    jumlah: Decimal | null
  }

  export type PembayaranSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    jumlah: Decimal | null
  }

  export type PembayaranMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    kodeTagihan: string | null
    jumlah: Decimal | null
    status: string | null
    buktiPembayaran: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PembayaranMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    kodeTagihan: string | null
    jumlah: Decimal | null
    status: string | null
    buktiPembayaran: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PembayaranCountAggregateOutputType = {
    id: number
    userId: number
    kodeTagihan: number
    jumlah: number
    status: number
    buktiPembayaran: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PembayaranAvgAggregateInputType = {
    id?: true
    userId?: true
    jumlah?: true
  }

  export type PembayaranSumAggregateInputType = {
    id?: true
    userId?: true
    jumlah?: true
  }

  export type PembayaranMinAggregateInputType = {
    id?: true
    userId?: true
    kodeTagihan?: true
    jumlah?: true
    status?: true
    buktiPembayaran?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PembayaranMaxAggregateInputType = {
    id?: true
    userId?: true
    kodeTagihan?: true
    jumlah?: true
    status?: true
    buktiPembayaran?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PembayaranCountAggregateInputType = {
    id?: true
    userId?: true
    kodeTagihan?: true
    jumlah?: true
    status?: true
    buktiPembayaran?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PembayaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayaran to aggregate.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pembayarans
    **/
    _count?: true | PembayaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PembayaranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PembayaranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PembayaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PembayaranMaxAggregateInputType
  }

  export type GetPembayaranAggregateType<T extends PembayaranAggregateArgs> = {
        [P in keyof T & keyof AggregatePembayaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePembayaran[P]>
      : GetScalarType<T[P], AggregatePembayaran[P]>
  }




  export type PembayaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PembayaranWhereInput
    orderBy?: PembayaranOrderByWithAggregationInput | PembayaranOrderByWithAggregationInput[]
    by: PembayaranScalarFieldEnum[] | PembayaranScalarFieldEnum
    having?: PembayaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PembayaranCountAggregateInputType | true
    _avg?: PembayaranAvgAggregateInputType
    _sum?: PembayaranSumAggregateInputType
    _min?: PembayaranMinAggregateInputType
    _max?: PembayaranMaxAggregateInputType
  }

  export type PembayaranGroupByOutputType = {
    id: bigint
    userId: bigint
    kodeTagihan: string
    jumlah: Decimal
    status: string
    buktiPembayaran: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: PembayaranCountAggregateOutputType | null
    _avg: PembayaranAvgAggregateOutputType | null
    _sum: PembayaranSumAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  type GetPembayaranGroupByPayload<T extends PembayaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PembayaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PembayaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
            : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
        }
      >
    >


  export type PembayaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kodeTagihan?: boolean
    jumlah?: boolean
    status?: boolean
    buktiPembayaran?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kodeTagihan?: boolean
    jumlah?: boolean
    status?: boolean
    buktiPembayaran?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kodeTagihan?: boolean
    jumlah?: boolean
    status?: boolean
    buktiPembayaran?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectScalar = {
    id?: boolean
    userId?: boolean
    kodeTagihan?: boolean
    jumlah?: boolean
    status?: boolean
    buktiPembayaran?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PembayaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "kodeTagihan" | "jumlah" | "status" | "buktiPembayaran" | "createdAt" | "updatedAt", ExtArgs["result"]["pembayaran"]>
  export type PembayaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PembayaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pembayaran"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      kodeTagihan: string
      jumlah: Prisma.Decimal
      status: string
      buktiPembayaran: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["pembayaran"]>
    composites: {}
  }

  type PembayaranGetPayload<S extends boolean | null | undefined | PembayaranDefaultArgs> = $Result.GetResult<Prisma.$PembayaranPayload, S>

  type PembayaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PembayaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PembayaranCountAggregateInputType | true
    }

  export interface PembayaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pembayaran'], meta: { name: 'Pembayaran' } }
    /**
     * Find zero or one Pembayaran that matches the filter.
     * @param {PembayaranFindUniqueArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PembayaranFindUniqueArgs>(args: SelectSubset<T, PembayaranFindUniqueArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pembayaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PembayaranFindUniqueOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PembayaranFindUniqueOrThrowArgs>(args: SelectSubset<T, PembayaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PembayaranFindFirstArgs>(args?: SelectSubset<T, PembayaranFindFirstArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PembayaranFindFirstOrThrowArgs>(args?: SelectSubset<T, PembayaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pembayarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany()
     * 
     * // Get first 10 Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PembayaranFindManyArgs>(args?: SelectSubset<T, PembayaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pembayaran.
     * @param {PembayaranCreateArgs} args - Arguments to create a Pembayaran.
     * @example
     * // Create one Pembayaran
     * const Pembayaran = await prisma.pembayaran.create({
     *   data: {
     *     // ... data to create a Pembayaran
     *   }
     * })
     * 
     */
    create<T extends PembayaranCreateArgs>(args: SelectSubset<T, PembayaranCreateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pembayarans.
     * @param {PembayaranCreateManyArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PembayaranCreateManyArgs>(args?: SelectSubset<T, PembayaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pembayarans and returns the data saved in the database.
     * @param {PembayaranCreateManyAndReturnArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PembayaranCreateManyAndReturnArgs>(args?: SelectSubset<T, PembayaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pembayaran.
     * @param {PembayaranDeleteArgs} args - Arguments to delete one Pembayaran.
     * @example
     * // Delete one Pembayaran
     * const Pembayaran = await prisma.pembayaran.delete({
     *   where: {
     *     // ... filter to delete one Pembayaran
     *   }
     * })
     * 
     */
    delete<T extends PembayaranDeleteArgs>(args: SelectSubset<T, PembayaranDeleteArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pembayaran.
     * @param {PembayaranUpdateArgs} args - Arguments to update one Pembayaran.
     * @example
     * // Update one Pembayaran
     * const pembayaran = await prisma.pembayaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PembayaranUpdateArgs>(args: SelectSubset<T, PembayaranUpdateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pembayarans.
     * @param {PembayaranDeleteManyArgs} args - Arguments to filter Pembayarans to delete.
     * @example
     * // Delete a few Pembayarans
     * const { count } = await prisma.pembayaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PembayaranDeleteManyArgs>(args?: SelectSubset<T, PembayaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PembayaranUpdateManyArgs>(args: SelectSubset<T, PembayaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans and returns the data updated in the database.
     * @param {PembayaranUpdateManyAndReturnArgs} args - Arguments to update many Pembayarans.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PembayaranUpdateManyAndReturnArgs>(args: SelectSubset<T, PembayaranUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pembayaran.
     * @param {PembayaranUpsertArgs} args - Arguments to update or create a Pembayaran.
     * @example
     * // Update or create a Pembayaran
     * const pembayaran = await prisma.pembayaran.upsert({
     *   create: {
     *     // ... data to create a Pembayaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pembayaran we want to update
     *   }
     * })
     */
    upsert<T extends PembayaranUpsertArgs>(args: SelectSubset<T, PembayaranUpsertArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranCountArgs} args - Arguments to filter Pembayarans to count.
     * @example
     * // Count the number of Pembayarans
     * const count = await prisma.pembayaran.count({
     *   where: {
     *     // ... the filter for the Pembayarans we want to count
     *   }
     * })
    **/
    count<T extends PembayaranCountArgs>(
      args?: Subset<T, PembayaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PembayaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PembayaranAggregateArgs>(args: Subset<T, PembayaranAggregateArgs>): Prisma.PrismaPromise<GetPembayaranAggregateType<T>>

    /**
     * Group by Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PembayaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PembayaranGroupByArgs['orderBy'] }
        : { orderBy?: PembayaranGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PembayaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPembayaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pembayaran model
   */
  readonly fields: PembayaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pembayaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PembayaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pembayaran model
   */
  interface PembayaranFieldRefs {
    readonly id: FieldRef<"Pembayaran", 'BigInt'>
    readonly userId: FieldRef<"Pembayaran", 'BigInt'>
    readonly kodeTagihan: FieldRef<"Pembayaran", 'String'>
    readonly jumlah: FieldRef<"Pembayaran", 'Decimal'>
    readonly status: FieldRef<"Pembayaran", 'String'>
    readonly buktiPembayaran: FieldRef<"Pembayaran", 'String'>
    readonly createdAt: FieldRef<"Pembayaran", 'DateTime'>
    readonly updatedAt: FieldRef<"Pembayaran", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pembayaran findUnique
   */
  export type PembayaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findUniqueOrThrow
   */
  export type PembayaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findFirst
   */
  export type PembayaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findFirstOrThrow
   */
  export type PembayaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findMany
   */
  export type PembayaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayarans to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran create
   */
  export type PembayaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to create a Pembayaran.
     */
    data: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
  }

  /**
   * Pembayaran createMany
   */
  export type PembayaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pembayaran createManyAndReturn
   */
  export type PembayaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran update
   */
  export type PembayaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to update a Pembayaran.
     */
    data: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
    /**
     * Choose, which Pembayaran to update.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran updateMany
   */
  export type PembayaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
  }

  /**
   * Pembayaran updateManyAndReturn
   */
  export type PembayaranUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran upsert
   */
  export type PembayaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The filter to search for the Pembayaran to update in case it exists.
     */
    where: PembayaranWhereUniqueInput
    /**
     * In case the Pembayaran found by the `where` argument doesn't exist, create a new Pembayaran with this data.
     */
    create: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
    /**
     * In case the Pembayaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
  }

  /**
   * Pembayaran delete
   */
  export type PembayaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter which Pembayaran to delete.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran deleteMany
   */
  export type PembayaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayarans to delete
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to delete.
     */
    limit?: number
  }

  /**
   * Pembayaran without action
   */
  export type PembayaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
  }


  /**
   * Model Notifikasi
   */

  export type AggregateNotifikasi = {
    _count: NotifikasiCountAggregateOutputType | null
    _avg: NotifikasiAvgAggregateOutputType | null
    _sum: NotifikasiSumAggregateOutputType | null
    _min: NotifikasiMinAggregateOutputType | null
    _max: NotifikasiMaxAggregateOutputType | null
  }

  export type NotifikasiAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotifikasiSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
  }

  export type NotifikasiMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    judul: string | null
    pesan: string | null
    tipe: string | null
    link: string | null
    dibaca: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotifikasiMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    judul: string | null
    pesan: string | null
    tipe: string | null
    link: string | null
    dibaca: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotifikasiCountAggregateOutputType = {
    id: number
    userId: number
    judul: number
    pesan: number
    tipe: number
    link: number
    dibaca: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotifikasiAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotifikasiSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotifikasiMinAggregateInputType = {
    id?: true
    userId?: true
    judul?: true
    pesan?: true
    tipe?: true
    link?: true
    dibaca?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotifikasiMaxAggregateInputType = {
    id?: true
    userId?: true
    judul?: true
    pesan?: true
    tipe?: true
    link?: true
    dibaca?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotifikasiCountAggregateInputType = {
    id?: true
    userId?: true
    judul?: true
    pesan?: true
    tipe?: true
    link?: true
    dibaca?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotifikasiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifikasi to aggregate.
     */
    where?: NotifikasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifikasis to fetch.
     */
    orderBy?: NotifikasiOrderByWithRelationInput | NotifikasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotifikasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifikasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifikasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifikasis
    **/
    _count?: true | NotifikasiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotifikasiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotifikasiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotifikasiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotifikasiMaxAggregateInputType
  }

  export type GetNotifikasiAggregateType<T extends NotifikasiAggregateArgs> = {
        [P in keyof T & keyof AggregateNotifikasi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotifikasi[P]>
      : GetScalarType<T[P], AggregateNotifikasi[P]>
  }




  export type NotifikasiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotifikasiWhereInput
    orderBy?: NotifikasiOrderByWithAggregationInput | NotifikasiOrderByWithAggregationInput[]
    by: NotifikasiScalarFieldEnum[] | NotifikasiScalarFieldEnum
    having?: NotifikasiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotifikasiCountAggregateInputType | true
    _avg?: NotifikasiAvgAggregateInputType
    _sum?: NotifikasiSumAggregateInputType
    _min?: NotifikasiMinAggregateInputType
    _max?: NotifikasiMaxAggregateInputType
  }

  export type NotifikasiGroupByOutputType = {
    id: bigint
    userId: bigint
    judul: string
    pesan: string
    tipe: string | null
    link: string | null
    dibaca: boolean
    createdAt: Date | null
    updatedAt: Date | null
    _count: NotifikasiCountAggregateOutputType | null
    _avg: NotifikasiAvgAggregateOutputType | null
    _sum: NotifikasiSumAggregateOutputType | null
    _min: NotifikasiMinAggregateOutputType | null
    _max: NotifikasiMaxAggregateOutputType | null
  }

  type GetNotifikasiGroupByPayload<T extends NotifikasiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotifikasiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotifikasiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotifikasiGroupByOutputType[P]>
            : GetScalarType<T[P], NotifikasiGroupByOutputType[P]>
        }
      >
    >


  export type NotifikasiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    judul?: boolean
    pesan?: boolean
    tipe?: boolean
    link?: boolean
    dibaca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifikasi"]>

  export type NotifikasiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    judul?: boolean
    pesan?: boolean
    tipe?: boolean
    link?: boolean
    dibaca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifikasi"]>

  export type NotifikasiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    judul?: boolean
    pesan?: boolean
    tipe?: boolean
    link?: boolean
    dibaca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifikasi"]>

  export type NotifikasiSelectScalar = {
    id?: boolean
    userId?: boolean
    judul?: boolean
    pesan?: boolean
    tipe?: boolean
    link?: boolean
    dibaca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotifikasiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "judul" | "pesan" | "tipe" | "link" | "dibaca" | "createdAt" | "updatedAt", ExtArgs["result"]["notifikasi"]>
  export type NotifikasiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotifikasiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotifikasiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotifikasiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notifikasi"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      judul: string
      pesan: string
      tipe: string | null
      link: string | null
      dibaca: boolean
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["notifikasi"]>
    composites: {}
  }

  type NotifikasiGetPayload<S extends boolean | null | undefined | NotifikasiDefaultArgs> = $Result.GetResult<Prisma.$NotifikasiPayload, S>

  type NotifikasiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotifikasiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotifikasiCountAggregateInputType | true
    }

  export interface NotifikasiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notifikasi'], meta: { name: 'Notifikasi' } }
    /**
     * Find zero or one Notifikasi that matches the filter.
     * @param {NotifikasiFindUniqueArgs} args - Arguments to find a Notifikasi
     * @example
     * // Get one Notifikasi
     * const notifikasi = await prisma.notifikasi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotifikasiFindUniqueArgs>(args: SelectSubset<T, NotifikasiFindUniqueArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notifikasi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotifikasiFindUniqueOrThrowArgs} args - Arguments to find a Notifikasi
     * @example
     * // Get one Notifikasi
     * const notifikasi = await prisma.notifikasi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotifikasiFindUniqueOrThrowArgs>(args: SelectSubset<T, NotifikasiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifikasi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiFindFirstArgs} args - Arguments to find a Notifikasi
     * @example
     * // Get one Notifikasi
     * const notifikasi = await prisma.notifikasi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotifikasiFindFirstArgs>(args?: SelectSubset<T, NotifikasiFindFirstArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifikasi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiFindFirstOrThrowArgs} args - Arguments to find a Notifikasi
     * @example
     * // Get one Notifikasi
     * const notifikasi = await prisma.notifikasi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotifikasiFindFirstOrThrowArgs>(args?: SelectSubset<T, NotifikasiFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifikasis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifikasis
     * const notifikasis = await prisma.notifikasi.findMany()
     * 
     * // Get first 10 Notifikasis
     * const notifikasis = await prisma.notifikasi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notifikasiWithIdOnly = await prisma.notifikasi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotifikasiFindManyArgs>(args?: SelectSubset<T, NotifikasiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notifikasi.
     * @param {NotifikasiCreateArgs} args - Arguments to create a Notifikasi.
     * @example
     * // Create one Notifikasi
     * const Notifikasi = await prisma.notifikasi.create({
     *   data: {
     *     // ... data to create a Notifikasi
     *   }
     * })
     * 
     */
    create<T extends NotifikasiCreateArgs>(args: SelectSubset<T, NotifikasiCreateArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifikasis.
     * @param {NotifikasiCreateManyArgs} args - Arguments to create many Notifikasis.
     * @example
     * // Create many Notifikasis
     * const notifikasi = await prisma.notifikasi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotifikasiCreateManyArgs>(args?: SelectSubset<T, NotifikasiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifikasis and returns the data saved in the database.
     * @param {NotifikasiCreateManyAndReturnArgs} args - Arguments to create many Notifikasis.
     * @example
     * // Create many Notifikasis
     * const notifikasi = await prisma.notifikasi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifikasis and only return the `id`
     * const notifikasiWithIdOnly = await prisma.notifikasi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotifikasiCreateManyAndReturnArgs>(args?: SelectSubset<T, NotifikasiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notifikasi.
     * @param {NotifikasiDeleteArgs} args - Arguments to delete one Notifikasi.
     * @example
     * // Delete one Notifikasi
     * const Notifikasi = await prisma.notifikasi.delete({
     *   where: {
     *     // ... filter to delete one Notifikasi
     *   }
     * })
     * 
     */
    delete<T extends NotifikasiDeleteArgs>(args: SelectSubset<T, NotifikasiDeleteArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notifikasi.
     * @param {NotifikasiUpdateArgs} args - Arguments to update one Notifikasi.
     * @example
     * // Update one Notifikasi
     * const notifikasi = await prisma.notifikasi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotifikasiUpdateArgs>(args: SelectSubset<T, NotifikasiUpdateArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifikasis.
     * @param {NotifikasiDeleteManyArgs} args - Arguments to filter Notifikasis to delete.
     * @example
     * // Delete a few Notifikasis
     * const { count } = await prisma.notifikasi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotifikasiDeleteManyArgs>(args?: SelectSubset<T, NotifikasiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifikasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifikasis
     * const notifikasi = await prisma.notifikasi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotifikasiUpdateManyArgs>(args: SelectSubset<T, NotifikasiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifikasis and returns the data updated in the database.
     * @param {NotifikasiUpdateManyAndReturnArgs} args - Arguments to update many Notifikasis.
     * @example
     * // Update many Notifikasis
     * const notifikasi = await prisma.notifikasi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifikasis and only return the `id`
     * const notifikasiWithIdOnly = await prisma.notifikasi.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotifikasiUpdateManyAndReturnArgs>(args: SelectSubset<T, NotifikasiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notifikasi.
     * @param {NotifikasiUpsertArgs} args - Arguments to update or create a Notifikasi.
     * @example
     * // Update or create a Notifikasi
     * const notifikasi = await prisma.notifikasi.upsert({
     *   create: {
     *     // ... data to create a Notifikasi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notifikasi we want to update
     *   }
     * })
     */
    upsert<T extends NotifikasiUpsertArgs>(args: SelectSubset<T, NotifikasiUpsertArgs<ExtArgs>>): Prisma__NotifikasiClient<$Result.GetResult<Prisma.$NotifikasiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifikasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiCountArgs} args - Arguments to filter Notifikasis to count.
     * @example
     * // Count the number of Notifikasis
     * const count = await prisma.notifikasi.count({
     *   where: {
     *     // ... the filter for the Notifikasis we want to count
     *   }
     * })
    **/
    count<T extends NotifikasiCountArgs>(
      args?: Subset<T, NotifikasiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotifikasiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notifikasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotifikasiAggregateArgs>(args: Subset<T, NotifikasiAggregateArgs>): Prisma.PrismaPromise<GetNotifikasiAggregateType<T>>

    /**
     * Group by Notifikasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotifikasiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotifikasiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotifikasiGroupByArgs['orderBy'] }
        : { orderBy?: NotifikasiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotifikasiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotifikasiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notifikasi model
   */
  readonly fields: NotifikasiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notifikasi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotifikasiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notifikasi model
   */
  interface NotifikasiFieldRefs {
    readonly id: FieldRef<"Notifikasi", 'BigInt'>
    readonly userId: FieldRef<"Notifikasi", 'BigInt'>
    readonly judul: FieldRef<"Notifikasi", 'String'>
    readonly pesan: FieldRef<"Notifikasi", 'String'>
    readonly tipe: FieldRef<"Notifikasi", 'String'>
    readonly link: FieldRef<"Notifikasi", 'String'>
    readonly dibaca: FieldRef<"Notifikasi", 'Boolean'>
    readonly createdAt: FieldRef<"Notifikasi", 'DateTime'>
    readonly updatedAt: FieldRef<"Notifikasi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notifikasi findUnique
   */
  export type NotifikasiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter, which Notifikasi to fetch.
     */
    where: NotifikasiWhereUniqueInput
  }

  /**
   * Notifikasi findUniqueOrThrow
   */
  export type NotifikasiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter, which Notifikasi to fetch.
     */
    where: NotifikasiWhereUniqueInput
  }

  /**
   * Notifikasi findFirst
   */
  export type NotifikasiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter, which Notifikasi to fetch.
     */
    where?: NotifikasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifikasis to fetch.
     */
    orderBy?: NotifikasiOrderByWithRelationInput | NotifikasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifikasis.
     */
    cursor?: NotifikasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifikasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifikasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifikasis.
     */
    distinct?: NotifikasiScalarFieldEnum | NotifikasiScalarFieldEnum[]
  }

  /**
   * Notifikasi findFirstOrThrow
   */
  export type NotifikasiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter, which Notifikasi to fetch.
     */
    where?: NotifikasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifikasis to fetch.
     */
    orderBy?: NotifikasiOrderByWithRelationInput | NotifikasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifikasis.
     */
    cursor?: NotifikasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifikasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifikasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifikasis.
     */
    distinct?: NotifikasiScalarFieldEnum | NotifikasiScalarFieldEnum[]
  }

  /**
   * Notifikasi findMany
   */
  export type NotifikasiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter, which Notifikasis to fetch.
     */
    where?: NotifikasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifikasis to fetch.
     */
    orderBy?: NotifikasiOrderByWithRelationInput | NotifikasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifikasis.
     */
    cursor?: NotifikasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifikasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifikasis.
     */
    skip?: number
    distinct?: NotifikasiScalarFieldEnum | NotifikasiScalarFieldEnum[]
  }

  /**
   * Notifikasi create
   */
  export type NotifikasiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * The data needed to create a Notifikasi.
     */
    data: XOR<NotifikasiCreateInput, NotifikasiUncheckedCreateInput>
  }

  /**
   * Notifikasi createMany
   */
  export type NotifikasiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifikasis.
     */
    data: NotifikasiCreateManyInput | NotifikasiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notifikasi createManyAndReturn
   */
  export type NotifikasiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * The data used to create many Notifikasis.
     */
    data: NotifikasiCreateManyInput | NotifikasiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notifikasi update
   */
  export type NotifikasiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * The data needed to update a Notifikasi.
     */
    data: XOR<NotifikasiUpdateInput, NotifikasiUncheckedUpdateInput>
    /**
     * Choose, which Notifikasi to update.
     */
    where: NotifikasiWhereUniqueInput
  }

  /**
   * Notifikasi updateMany
   */
  export type NotifikasiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifikasis.
     */
    data: XOR<NotifikasiUpdateManyMutationInput, NotifikasiUncheckedUpdateManyInput>
    /**
     * Filter which Notifikasis to update
     */
    where?: NotifikasiWhereInput
    /**
     * Limit how many Notifikasis to update.
     */
    limit?: number
  }

  /**
   * Notifikasi updateManyAndReturn
   */
  export type NotifikasiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * The data used to update Notifikasis.
     */
    data: XOR<NotifikasiUpdateManyMutationInput, NotifikasiUncheckedUpdateManyInput>
    /**
     * Filter which Notifikasis to update
     */
    where?: NotifikasiWhereInput
    /**
     * Limit how many Notifikasis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notifikasi upsert
   */
  export type NotifikasiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * The filter to search for the Notifikasi to update in case it exists.
     */
    where: NotifikasiWhereUniqueInput
    /**
     * In case the Notifikasi found by the `where` argument doesn't exist, create a new Notifikasi with this data.
     */
    create: XOR<NotifikasiCreateInput, NotifikasiUncheckedCreateInput>
    /**
     * In case the Notifikasi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotifikasiUpdateInput, NotifikasiUncheckedUpdateInput>
  }

  /**
   * Notifikasi delete
   */
  export type NotifikasiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
    /**
     * Filter which Notifikasi to delete.
     */
    where: NotifikasiWhereUniqueInput
  }

  /**
   * Notifikasi deleteMany
   */
  export type NotifikasiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifikasis to delete
     */
    where?: NotifikasiWhereInput
    /**
     * Limit how many Notifikasis to delete.
     */
    limit?: number
  }

  /**
   * Notifikasi without action
   */
  export type NotifikasiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notifikasi
     */
    select?: NotifikasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notifikasi
     */
    omit?: NotifikasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotifikasiInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email',
    emailVerifiedAt: 'emailVerifiedAt',
    password: 'password',
    role: 'role',
    spesialis: 'spesialis',
    alamat: 'alamat',
    telepon: 'telepon',
    noHp: 'noHp',
    tanggalLahir: 'tanggalLahir',
    jenisKelamin: 'jenisKelamin',
    nik: 'nik',
    noRm: 'noRm',
    qrToken: 'qrToken',
    qrPath: 'qrPath',
    roleId: 'roleId',
    rememberToken: 'rememberToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PendaftaranScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dokterId: 'dokterId',
    diterimaOlehDokterId: 'diterimaOlehDokterId',
    nama: 'nama',
    tanggalLahir: 'tanggalLahir',
    jenisKelamin: 'jenisKelamin',
    noHp: 'noHp',
    nik: 'nik',
    keluhan: 'keluhan',
    tanggalKunjungan: 'tanggalKunjungan',
    jamKunjungan: 'jamKunjungan',
    spesialis: 'spesialis',
    status: 'status',
    nomorUrut: 'nomorUrut',
    kodeAntrian: 'kodeAntrian',
    qrToken: 'qrToken',
    qrPath: 'qrPath',
    checkinAt: 'checkinAt',
    checkedInAt: 'checkedInAt',
    checkedInBy: 'checkedInBy',
    noShowAt: 'noShowAt',
    noShowBy: 'noShowBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PendaftaranScalarFieldEnum = (typeof PendaftaranScalarFieldEnum)[keyof typeof PendaftaranScalarFieldEnum]


  export const RekamMedisScalarFieldEnum: {
    id: 'id',
    pendaftaranId: 'pendaftaranId',
    pasienId: 'pasienId',
    dokterId: 'dokterId',
    tanggal: 'tanggal',
    diagnosa: 'diagnosa',
    tindakan: 'tindakan',
    resep: 'resep',
    catatan: 'catatan',
    chainIndex: 'chainIndex',
    prevHash: 'prevHash',
    blockHash: 'blockHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RekamMedisScalarFieldEnum = (typeof RekamMedisScalarFieldEnum)[keyof typeof RekamMedisScalarFieldEnum]


  export const JadwalDokterScalarFieldEnum: {
    id: 'id',
    dokterId: 'dokterId',
    pasienId: 'pasienId',
    hari: 'hari',
    jamMulai: 'jamMulai',
    jamSelesai: 'jamSelesai',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JadwalDokterScalarFieldEnum = (typeof JadwalDokterScalarFieldEnum)[keyof typeof JadwalDokterScalarFieldEnum]


  export const PembayaranScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    kodeTagihan: 'kodeTagihan',
    jumlah: 'jumlah',
    status: 'status',
    buktiPembayaran: 'buktiPembayaran',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PembayaranScalarFieldEnum = (typeof PembayaranScalarFieldEnum)[keyof typeof PembayaranScalarFieldEnum]


  export const NotifikasiScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    judul: 'judul',
    pesan: 'pesan',
    tipe: 'tipe',
    link: 'link',
    dibaca: 'dibaca',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotifikasiScalarFieldEnum = (typeof NotifikasiScalarFieldEnum)[keyof typeof NotifikasiScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: BigIntFilter<"User"> | bigint | number
    name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    spesialis?: StringNullableFilter<"User"> | string | null
    alamat?: StringNullableFilter<"User"> | string | null
    telepon?: StringNullableFilter<"User"> | string | null
    noHp?: StringNullableFilter<"User"> | string | null
    tanggalLahir?: DateTimeNullableFilter<"User"> | Date | string | null
    jenisKelamin?: StringNullableFilter<"User"> | string | null
    nik?: StringNullableFilter<"User"> | string | null
    noRm?: StringNullableFilter<"User"> | string | null
    qrToken?: StringNullableFilter<"User"> | string | null
    qrPath?: StringNullableFilter<"User"> | string | null
    roleId?: BigIntNullableFilter<"User"> | bigint | number | null
    rememberToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    jadwalDokter?: JadwalDokterListRelationFilter
    pendaftarans?: PendaftaranListRelationFilter
    pendaftarDokter?: PendaftaranListRelationFilter
    pendaftarDiterima?: PendaftaranListRelationFilter
    notifikasis?: NotifikasiListRelationFilter
    pembayarans?: PembayaranListRelationFilter
    rekamMedisDokter?: RekamMedisListRelationFilter
    rekamMedisPasien?: RekamMedisListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    spesialis?: SortOrderInput | SortOrder
    alamat?: SortOrderInput | SortOrder
    telepon?: SortOrderInput | SortOrder
    noHp?: SortOrderInput | SortOrder
    tanggalLahir?: SortOrderInput | SortOrder
    jenisKelamin?: SortOrderInput | SortOrder
    nik?: SortOrderInput | SortOrder
    noRm?: SortOrderInput | SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrPath?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    rememberToken?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    jadwalDokter?: JadwalDokterOrderByRelationAggregateInput
    pendaftarans?: PendaftaranOrderByRelationAggregateInput
    pendaftarDokter?: PendaftaranOrderByRelationAggregateInput
    pendaftarDiterima?: PendaftaranOrderByRelationAggregateInput
    notifikasis?: NotifikasiOrderByRelationAggregateInput
    pembayarans?: PembayaranOrderByRelationAggregateInput
    rekamMedisDokter?: RekamMedisOrderByRelationAggregateInput
    rekamMedisPasien?: RekamMedisOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    username?: string
    email?: string
    noRm?: string
    qrToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    spesialis?: StringNullableFilter<"User"> | string | null
    alamat?: StringNullableFilter<"User"> | string | null
    telepon?: StringNullableFilter<"User"> | string | null
    noHp?: StringNullableFilter<"User"> | string | null
    tanggalLahir?: DateTimeNullableFilter<"User"> | Date | string | null
    jenisKelamin?: StringNullableFilter<"User"> | string | null
    nik?: StringNullableFilter<"User"> | string | null
    qrPath?: StringNullableFilter<"User"> | string | null
    roleId?: BigIntNullableFilter<"User"> | bigint | number | null
    rememberToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    jadwalDokter?: JadwalDokterListRelationFilter
    pendaftarans?: PendaftaranListRelationFilter
    pendaftarDokter?: PendaftaranListRelationFilter
    pendaftarDiterima?: PendaftaranListRelationFilter
    notifikasis?: NotifikasiListRelationFilter
    pembayarans?: PembayaranListRelationFilter
    rekamMedisDokter?: RekamMedisListRelationFilter
    rekamMedisPasien?: RekamMedisListRelationFilter
  }, "id" | "username" | "email" | "noRm" | "qrToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    spesialis?: SortOrderInput | SortOrder
    alamat?: SortOrderInput | SortOrder
    telepon?: SortOrderInput | SortOrder
    noHp?: SortOrderInput | SortOrder
    tanggalLahir?: SortOrderInput | SortOrder
    jenisKelamin?: SortOrderInput | SortOrder
    nik?: SortOrderInput | SortOrder
    noRm?: SortOrderInput | SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrPath?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    rememberToken?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"User"> | bigint | number
    name?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    spesialis?: StringNullableWithAggregatesFilter<"User"> | string | null
    alamat?: StringNullableWithAggregatesFilter<"User"> | string | null
    telepon?: StringNullableWithAggregatesFilter<"User"> | string | null
    noHp?: StringNullableWithAggregatesFilter<"User"> | string | null
    tanggalLahir?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    jenisKelamin?: StringNullableWithAggregatesFilter<"User"> | string | null
    nik?: StringNullableWithAggregatesFilter<"User"> | string | null
    noRm?: StringNullableWithAggregatesFilter<"User"> | string | null
    qrToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    qrPath?: StringNullableWithAggregatesFilter<"User"> | string | null
    roleId?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    rememberToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PendaftaranWhereInput = {
    AND?: PendaftaranWhereInput | PendaftaranWhereInput[]
    OR?: PendaftaranWhereInput[]
    NOT?: PendaftaranWhereInput | PendaftaranWhereInput[]
    id?: BigIntFilter<"Pendaftaran"> | bigint | number
    userId?: BigIntFilter<"Pendaftaran"> | bigint | number
    dokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    diterimaOlehDokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    nama?: StringFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeFilter<"Pendaftaran"> | Date | string
    jenisKelamin?: StringFilter<"Pendaftaran"> | string
    noHp?: StringFilter<"Pendaftaran"> | string
    nik?: StringFilter<"Pendaftaran"> | string
    keluhan?: StringFilter<"Pendaftaran"> | string
    tanggalKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    jamKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    spesialis?: StringNullableFilter<"Pendaftaran"> | string | null
    status?: StringFilter<"Pendaftaran"> | string
    nomorUrut?: IntNullableFilter<"Pendaftaran"> | number | null
    kodeAntrian?: StringNullableFilter<"Pendaftaran"> | string | null
    qrToken?: StringNullableFilter<"Pendaftaran"> | string | null
    qrPath?: StringNullableFilter<"Pendaftaran"> | string | null
    checkinAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    noShowAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    noShowBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    createdAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dokter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    diterimaOlehDokter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekamMedis?: RekamMedisListRelationFilter
  }

  export type PendaftaranOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrderInput | SortOrder
    diterimaOlehDokterId?: SortOrderInput | SortOrder
    nama?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    noHp?: SortOrder
    nik?: SortOrder
    keluhan?: SortOrder
    tanggalKunjungan?: SortOrderInput | SortOrder
    jamKunjungan?: SortOrderInput | SortOrder
    spesialis?: SortOrderInput | SortOrder
    status?: SortOrder
    nomorUrut?: SortOrderInput | SortOrder
    kodeAntrian?: SortOrderInput | SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrPath?: SortOrderInput | SortOrder
    checkinAt?: SortOrderInput | SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedInBy?: SortOrderInput | SortOrder
    noShowAt?: SortOrderInput | SortOrder
    noShowBy?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    dokter?: UserOrderByWithRelationInput
    diterimaOlehDokter?: UserOrderByWithRelationInput
    rekamMedis?: RekamMedisOrderByRelationAggregateInput
  }

  export type PendaftaranWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: PendaftaranWhereInput | PendaftaranWhereInput[]
    OR?: PendaftaranWhereInput[]
    NOT?: PendaftaranWhereInput | PendaftaranWhereInput[]
    userId?: BigIntFilter<"Pendaftaran"> | bigint | number
    dokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    diterimaOlehDokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    nama?: StringFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeFilter<"Pendaftaran"> | Date | string
    jenisKelamin?: StringFilter<"Pendaftaran"> | string
    noHp?: StringFilter<"Pendaftaran"> | string
    nik?: StringFilter<"Pendaftaran"> | string
    keluhan?: StringFilter<"Pendaftaran"> | string
    tanggalKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    jamKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    spesialis?: StringNullableFilter<"Pendaftaran"> | string | null
    status?: StringFilter<"Pendaftaran"> | string
    nomorUrut?: IntNullableFilter<"Pendaftaran"> | number | null
    kodeAntrian?: StringNullableFilter<"Pendaftaran"> | string | null
    qrToken?: StringNullableFilter<"Pendaftaran"> | string | null
    qrPath?: StringNullableFilter<"Pendaftaran"> | string | null
    checkinAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    noShowAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    noShowBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    createdAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dokter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    diterimaOlehDokter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekamMedis?: RekamMedisListRelationFilter
  }, "id">

  export type PendaftaranOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrderInput | SortOrder
    diterimaOlehDokterId?: SortOrderInput | SortOrder
    nama?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    noHp?: SortOrder
    nik?: SortOrder
    keluhan?: SortOrder
    tanggalKunjungan?: SortOrderInput | SortOrder
    jamKunjungan?: SortOrderInput | SortOrder
    spesialis?: SortOrderInput | SortOrder
    status?: SortOrder
    nomorUrut?: SortOrderInput | SortOrder
    kodeAntrian?: SortOrderInput | SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrPath?: SortOrderInput | SortOrder
    checkinAt?: SortOrderInput | SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedInBy?: SortOrderInput | SortOrder
    noShowAt?: SortOrderInput | SortOrder
    noShowBy?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: PendaftaranCountOrderByAggregateInput
    _avg?: PendaftaranAvgOrderByAggregateInput
    _max?: PendaftaranMaxOrderByAggregateInput
    _min?: PendaftaranMinOrderByAggregateInput
    _sum?: PendaftaranSumOrderByAggregateInput
  }

  export type PendaftaranScalarWhereWithAggregatesInput = {
    AND?: PendaftaranScalarWhereWithAggregatesInput | PendaftaranScalarWhereWithAggregatesInput[]
    OR?: PendaftaranScalarWhereWithAggregatesInput[]
    NOT?: PendaftaranScalarWhereWithAggregatesInput | PendaftaranScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Pendaftaran"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"Pendaftaran"> | bigint | number
    dokterId?: BigIntNullableWithAggregatesFilter<"Pendaftaran"> | bigint | number | null
    diterimaOlehDokterId?: BigIntNullableWithAggregatesFilter<"Pendaftaran"> | bigint | number | null
    nama?: StringWithAggregatesFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeWithAggregatesFilter<"Pendaftaran"> | Date | string
    jenisKelamin?: StringWithAggregatesFilter<"Pendaftaran"> | string
    noHp?: StringWithAggregatesFilter<"Pendaftaran"> | string
    nik?: StringWithAggregatesFilter<"Pendaftaran"> | string
    keluhan?: StringWithAggregatesFilter<"Pendaftaran"> | string
    tanggalKunjungan?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    jamKunjungan?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    spesialis?: StringNullableWithAggregatesFilter<"Pendaftaran"> | string | null
    status?: StringWithAggregatesFilter<"Pendaftaran"> | string
    nomorUrut?: IntNullableWithAggregatesFilter<"Pendaftaran"> | number | null
    kodeAntrian?: StringNullableWithAggregatesFilter<"Pendaftaran"> | string | null
    qrToken?: StringNullableWithAggregatesFilter<"Pendaftaran"> | string | null
    qrPath?: StringNullableWithAggregatesFilter<"Pendaftaran"> | string | null
    checkinAt?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    checkedInAt?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    checkedInBy?: BigIntNullableWithAggregatesFilter<"Pendaftaran"> | bigint | number | null
    noShowAt?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    noShowBy?: BigIntNullableWithAggregatesFilter<"Pendaftaran"> | bigint | number | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Pendaftaran"> | Date | string | null
  }

  export type RekamMedisWhereInput = {
    AND?: RekamMedisWhereInput | RekamMedisWhereInput[]
    OR?: RekamMedisWhereInput[]
    NOT?: RekamMedisWhereInput | RekamMedisWhereInput[]
    id?: BigIntFilter<"RekamMedis"> | bigint | number
    pendaftaranId?: BigIntFilter<"RekamMedis"> | bigint | number
    pasienId?: BigIntNullableFilter<"RekamMedis"> | bigint | number | null
    dokterId?: BigIntFilter<"RekamMedis"> | bigint | number
    tanggal?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    diagnosa?: StringFilter<"RekamMedis"> | string
    tindakan?: StringFilter<"RekamMedis"> | string
    resep?: StringNullableFilter<"RekamMedis"> | string | null
    catatan?: StringNullableFilter<"RekamMedis"> | string | null
    chainIndex?: IntNullableFilter<"RekamMedis"> | number | null
    prevHash?: StringNullableFilter<"RekamMedis"> | string | null
    blockHash?: StringNullableFilter<"RekamMedis"> | string | null
    createdAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    dokter?: XOR<UserScalarRelationFilter, UserWhereInput>
    pasien?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pendaftaran?: XOR<PendaftaranScalarRelationFilter, PendaftaranWhereInput>
  }

  export type RekamMedisOrderByWithRelationInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrderInput | SortOrder
    dokterId?: SortOrder
    tanggal?: SortOrderInput | SortOrder
    diagnosa?: SortOrder
    tindakan?: SortOrder
    resep?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    chainIndex?: SortOrderInput | SortOrder
    prevHash?: SortOrderInput | SortOrder
    blockHash?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    dokter?: UserOrderByWithRelationInput
    pasien?: UserOrderByWithRelationInput
    pendaftaran?: PendaftaranOrderByWithRelationInput
  }

  export type RekamMedisWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: RekamMedisWhereInput | RekamMedisWhereInput[]
    OR?: RekamMedisWhereInput[]
    NOT?: RekamMedisWhereInput | RekamMedisWhereInput[]
    pendaftaranId?: BigIntFilter<"RekamMedis"> | bigint | number
    pasienId?: BigIntNullableFilter<"RekamMedis"> | bigint | number | null
    dokterId?: BigIntFilter<"RekamMedis"> | bigint | number
    tanggal?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    diagnosa?: StringFilter<"RekamMedis"> | string
    tindakan?: StringFilter<"RekamMedis"> | string
    resep?: StringNullableFilter<"RekamMedis"> | string | null
    catatan?: StringNullableFilter<"RekamMedis"> | string | null
    chainIndex?: IntNullableFilter<"RekamMedis"> | number | null
    prevHash?: StringNullableFilter<"RekamMedis"> | string | null
    blockHash?: StringNullableFilter<"RekamMedis"> | string | null
    createdAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    dokter?: XOR<UserScalarRelationFilter, UserWhereInput>
    pasien?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    pendaftaran?: XOR<PendaftaranScalarRelationFilter, PendaftaranWhereInput>
  }, "id">

  export type RekamMedisOrderByWithAggregationInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrderInput | SortOrder
    dokterId?: SortOrder
    tanggal?: SortOrderInput | SortOrder
    diagnosa?: SortOrder
    tindakan?: SortOrder
    resep?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    chainIndex?: SortOrderInput | SortOrder
    prevHash?: SortOrderInput | SortOrder
    blockHash?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: RekamMedisCountOrderByAggregateInput
    _avg?: RekamMedisAvgOrderByAggregateInput
    _max?: RekamMedisMaxOrderByAggregateInput
    _min?: RekamMedisMinOrderByAggregateInput
    _sum?: RekamMedisSumOrderByAggregateInput
  }

  export type RekamMedisScalarWhereWithAggregatesInput = {
    AND?: RekamMedisScalarWhereWithAggregatesInput | RekamMedisScalarWhereWithAggregatesInput[]
    OR?: RekamMedisScalarWhereWithAggregatesInput[]
    NOT?: RekamMedisScalarWhereWithAggregatesInput | RekamMedisScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"RekamMedis"> | bigint | number
    pendaftaranId?: BigIntWithAggregatesFilter<"RekamMedis"> | bigint | number
    pasienId?: BigIntNullableWithAggregatesFilter<"RekamMedis"> | bigint | number | null
    dokterId?: BigIntWithAggregatesFilter<"RekamMedis"> | bigint | number
    tanggal?: DateTimeNullableWithAggregatesFilter<"RekamMedis"> | Date | string | null
    diagnosa?: StringWithAggregatesFilter<"RekamMedis"> | string
    tindakan?: StringWithAggregatesFilter<"RekamMedis"> | string
    resep?: StringNullableWithAggregatesFilter<"RekamMedis"> | string | null
    catatan?: StringNullableWithAggregatesFilter<"RekamMedis"> | string | null
    chainIndex?: IntNullableWithAggregatesFilter<"RekamMedis"> | number | null
    prevHash?: StringNullableWithAggregatesFilter<"RekamMedis"> | string | null
    blockHash?: StringNullableWithAggregatesFilter<"RekamMedis"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"RekamMedis"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"RekamMedis"> | Date | string | null
  }

  export type JadwalDokterWhereInput = {
    AND?: JadwalDokterWhereInput | JadwalDokterWhereInput[]
    OR?: JadwalDokterWhereInput[]
    NOT?: JadwalDokterWhereInput | JadwalDokterWhereInput[]
    id?: BigIntFilter<"JadwalDokter"> | bigint | number
    dokterId?: BigIntFilter<"JadwalDokter"> | bigint | number
    pasienId?: BigIntNullableFilter<"JadwalDokter"> | bigint | number | null
    hari?: StringFilter<"JadwalDokter"> | string
    jamMulai?: DateTimeFilter<"JadwalDokter"> | Date | string
    jamSelesai?: DateTimeFilter<"JadwalDokter"> | Date | string
    createdAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
    dokter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type JadwalDokterOrderByWithRelationInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrderInput | SortOrder
    hari?: SortOrder
    jamMulai?: SortOrder
    jamSelesai?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    dokter?: UserOrderByWithRelationInput
  }

  export type JadwalDokterWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: JadwalDokterWhereInput | JadwalDokterWhereInput[]
    OR?: JadwalDokterWhereInput[]
    NOT?: JadwalDokterWhereInput | JadwalDokterWhereInput[]
    dokterId?: BigIntFilter<"JadwalDokter"> | bigint | number
    pasienId?: BigIntNullableFilter<"JadwalDokter"> | bigint | number | null
    hari?: StringFilter<"JadwalDokter"> | string
    jamMulai?: DateTimeFilter<"JadwalDokter"> | Date | string
    jamSelesai?: DateTimeFilter<"JadwalDokter"> | Date | string
    createdAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
    dokter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type JadwalDokterOrderByWithAggregationInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrderInput | SortOrder
    hari?: SortOrder
    jamMulai?: SortOrder
    jamSelesai?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: JadwalDokterCountOrderByAggregateInput
    _avg?: JadwalDokterAvgOrderByAggregateInput
    _max?: JadwalDokterMaxOrderByAggregateInput
    _min?: JadwalDokterMinOrderByAggregateInput
    _sum?: JadwalDokterSumOrderByAggregateInput
  }

  export type JadwalDokterScalarWhereWithAggregatesInput = {
    AND?: JadwalDokterScalarWhereWithAggregatesInput | JadwalDokterScalarWhereWithAggregatesInput[]
    OR?: JadwalDokterScalarWhereWithAggregatesInput[]
    NOT?: JadwalDokterScalarWhereWithAggregatesInput | JadwalDokterScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"JadwalDokter"> | bigint | number
    dokterId?: BigIntWithAggregatesFilter<"JadwalDokter"> | bigint | number
    pasienId?: BigIntNullableWithAggregatesFilter<"JadwalDokter"> | bigint | number | null
    hari?: StringWithAggregatesFilter<"JadwalDokter"> | string
    jamMulai?: DateTimeWithAggregatesFilter<"JadwalDokter"> | Date | string
    jamSelesai?: DateTimeWithAggregatesFilter<"JadwalDokter"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"JadwalDokter"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"JadwalDokter"> | Date | string | null
  }

  export type PembayaranWhereInput = {
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    id?: BigIntFilter<"Pembayaran"> | bigint | number
    userId?: BigIntFilter<"Pembayaran"> | bigint | number
    kodeTagihan?: StringFilter<"Pembayaran"> | string
    jumlah?: DecimalFilter<"Pembayaran"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Pembayaran"> | string
    buktiPembayaran?: StringNullableFilter<"Pembayaran"> | string | null
    createdAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PembayaranOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    kodeTagihan?: SortOrder
    jumlah?: SortOrder
    status?: SortOrder
    buktiPembayaran?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PembayaranWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    kodeTagihan?: string
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    userId?: BigIntFilter<"Pembayaran"> | bigint | number
    jumlah?: DecimalFilter<"Pembayaran"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Pembayaran"> | string
    buktiPembayaran?: StringNullableFilter<"Pembayaran"> | string | null
    createdAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "kodeTagihan">

  export type PembayaranOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    kodeTagihan?: SortOrder
    jumlah?: SortOrder
    status?: SortOrder
    buktiPembayaran?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: PembayaranCountOrderByAggregateInput
    _avg?: PembayaranAvgOrderByAggregateInput
    _max?: PembayaranMaxOrderByAggregateInput
    _min?: PembayaranMinOrderByAggregateInput
    _sum?: PembayaranSumOrderByAggregateInput
  }

  export type PembayaranScalarWhereWithAggregatesInput = {
    AND?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    OR?: PembayaranScalarWhereWithAggregatesInput[]
    NOT?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Pembayaran"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"Pembayaran"> | bigint | number
    kodeTagihan?: StringWithAggregatesFilter<"Pembayaran"> | string
    jumlah?: DecimalWithAggregatesFilter<"Pembayaran"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"Pembayaran"> | string
    buktiPembayaran?: StringNullableWithAggregatesFilter<"Pembayaran"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Pembayaran"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Pembayaran"> | Date | string | null
  }

  export type NotifikasiWhereInput = {
    AND?: NotifikasiWhereInput | NotifikasiWhereInput[]
    OR?: NotifikasiWhereInput[]
    NOT?: NotifikasiWhereInput | NotifikasiWhereInput[]
    id?: BigIntFilter<"Notifikasi"> | bigint | number
    userId?: BigIntFilter<"Notifikasi"> | bigint | number
    judul?: StringFilter<"Notifikasi"> | string
    pesan?: StringFilter<"Notifikasi"> | string
    tipe?: StringNullableFilter<"Notifikasi"> | string | null
    link?: StringNullableFilter<"Notifikasi"> | string | null
    dibaca?: BoolFilter<"Notifikasi"> | boolean
    createdAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotifikasiOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    judul?: SortOrder
    pesan?: SortOrder
    tipe?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    dibaca?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotifikasiWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: NotifikasiWhereInput | NotifikasiWhereInput[]
    OR?: NotifikasiWhereInput[]
    NOT?: NotifikasiWhereInput | NotifikasiWhereInput[]
    userId?: BigIntFilter<"Notifikasi"> | bigint | number
    judul?: StringFilter<"Notifikasi"> | string
    pesan?: StringFilter<"Notifikasi"> | string
    tipe?: StringNullableFilter<"Notifikasi"> | string | null
    link?: StringNullableFilter<"Notifikasi"> | string | null
    dibaca?: BoolFilter<"Notifikasi"> | boolean
    createdAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotifikasiOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    judul?: SortOrder
    pesan?: SortOrder
    tipe?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    dibaca?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: NotifikasiCountOrderByAggregateInput
    _avg?: NotifikasiAvgOrderByAggregateInput
    _max?: NotifikasiMaxOrderByAggregateInput
    _min?: NotifikasiMinOrderByAggregateInput
    _sum?: NotifikasiSumOrderByAggregateInput
  }

  export type NotifikasiScalarWhereWithAggregatesInput = {
    AND?: NotifikasiScalarWhereWithAggregatesInput | NotifikasiScalarWhereWithAggregatesInput[]
    OR?: NotifikasiScalarWhereWithAggregatesInput[]
    NOT?: NotifikasiScalarWhereWithAggregatesInput | NotifikasiScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Notifikasi"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"Notifikasi"> | bigint | number
    judul?: StringWithAggregatesFilter<"Notifikasi"> | string
    pesan?: StringWithAggregatesFilter<"Notifikasi"> | string
    tipe?: StringNullableWithAggregatesFilter<"Notifikasi"> | string | null
    link?: StringNullableWithAggregatesFilter<"Notifikasi"> | string | null
    dibaca?: BoolWithAggregatesFilter<"Notifikasi"> | boolean
    createdAt?: DateTimeNullableWithAggregatesFilter<"Notifikasi"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Notifikasi"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserCreateManyInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendaftaranCreateInput = {
    id?: bigint | number
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPendaftaransInput
    dokter?: UserCreateNestedOneWithoutPendaftarDokterInput
    diterimaOlehDokter?: UserCreateNestedOneWithoutPendaftarDiterimaInput
    rekamMedis?: RekamMedisCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    dokterId?: bigint | number | null
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    rekamMedis?: RekamMedisUncheckedCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPendaftaransNestedInput
    dokter?: UserUpdateOneWithoutPendaftarDokterNestedInput
    diterimaOlehDokter?: UserUpdateOneWithoutPendaftarDiterimaNestedInput
    rekamMedis?: RekamMedisUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rekamMedis?: RekamMedisUncheckedUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    dokterId?: bigint | number | null
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PendaftaranUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendaftaranUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisCreateInput = {
    id?: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dokter: UserCreateNestedOneWithoutRekamMedisDokterInput
    pasien?: UserCreateNestedOneWithoutRekamMedisPasienInput
    pendaftaran: PendaftaranCreateNestedOneWithoutRekamMedisInput
  }

  export type RekamMedisUncheckedCreateInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    pasienId?: bigint | number | null
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dokter?: UserUpdateOneRequiredWithoutRekamMedisDokterNestedInput
    pasien?: UserUpdateOneWithoutRekamMedisPasienNestedInput
    pendaftaran?: PendaftaranUpdateOneRequiredWithoutRekamMedisNestedInput
  }

  export type RekamMedisUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisCreateManyInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    pasienId?: bigint | number | null
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JadwalDokterCreateInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dokter: UserCreateNestedOneWithoutJadwalDokterInput
  }

  export type JadwalDokterUncheckedCreateInput = {
    id?: bigint | number
    dokterId: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type JadwalDokterUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dokter?: UserUpdateOneRequiredWithoutJadwalDokterNestedInput
  }

  export type JadwalDokterUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JadwalDokterCreateManyInput = {
    id?: bigint | number
    dokterId: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type JadwalDokterUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JadwalDokterUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranCreateInput = {
    id?: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPembayaransInput
  }

  export type PembayaranUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PembayaranUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPembayaransNestedInput
  }

  export type PembayaranUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PembayaranUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiCreateInput = {
    id?: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutNotifikasisInput
  }

  export type NotifikasiUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type NotifikasiUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutNotifikasisNestedInput
  }

  export type NotifikasiUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type NotifikasiUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type JadwalDokterListRelationFilter = {
    every?: JadwalDokterWhereInput
    some?: JadwalDokterWhereInput
    none?: JadwalDokterWhereInput
  }

  export type PendaftaranListRelationFilter = {
    every?: PendaftaranWhereInput
    some?: PendaftaranWhereInput
    none?: PendaftaranWhereInput
  }

  export type NotifikasiListRelationFilter = {
    every?: NotifikasiWhereInput
    some?: NotifikasiWhereInput
    none?: NotifikasiWhereInput
  }

  export type PembayaranListRelationFilter = {
    every?: PembayaranWhereInput
    some?: PembayaranWhereInput
    none?: PembayaranWhereInput
  }

  export type RekamMedisListRelationFilter = {
    every?: RekamMedisWhereInput
    some?: RekamMedisWhereInput
    none?: RekamMedisWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JadwalDokterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PendaftaranOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotifikasiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PembayaranOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RekamMedisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    spesialis?: SortOrder
    alamat?: SortOrder
    telepon?: SortOrder
    noHp?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    nik?: SortOrder
    noRm?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    roleId?: SortOrder
    rememberToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    spesialis?: SortOrder
    alamat?: SortOrder
    telepon?: SortOrder
    noHp?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    nik?: SortOrder
    noRm?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    roleId?: SortOrder
    rememberToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    spesialis?: SortOrder
    alamat?: SortOrder
    telepon?: SortOrder
    noHp?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    nik?: SortOrder
    noRm?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    roleId?: SortOrder
    rememberToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PendaftaranCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrder
    diterimaOlehDokterId?: SortOrder
    nama?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    noHp?: SortOrder
    nik?: SortOrder
    keluhan?: SortOrder
    tanggalKunjungan?: SortOrder
    jamKunjungan?: SortOrder
    spesialis?: SortOrder
    status?: SortOrder
    nomorUrut?: SortOrder
    kodeAntrian?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    checkinAt?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    noShowAt?: SortOrder
    noShowBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendaftaranAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrder
    diterimaOlehDokterId?: SortOrder
    nomorUrut?: SortOrder
    checkedInBy?: SortOrder
    noShowBy?: SortOrder
  }

  export type PendaftaranMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrder
    diterimaOlehDokterId?: SortOrder
    nama?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    noHp?: SortOrder
    nik?: SortOrder
    keluhan?: SortOrder
    tanggalKunjungan?: SortOrder
    jamKunjungan?: SortOrder
    spesialis?: SortOrder
    status?: SortOrder
    nomorUrut?: SortOrder
    kodeAntrian?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    checkinAt?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    noShowAt?: SortOrder
    noShowBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendaftaranMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrder
    diterimaOlehDokterId?: SortOrder
    nama?: SortOrder
    tanggalLahir?: SortOrder
    jenisKelamin?: SortOrder
    noHp?: SortOrder
    nik?: SortOrder
    keluhan?: SortOrder
    tanggalKunjungan?: SortOrder
    jamKunjungan?: SortOrder
    spesialis?: SortOrder
    status?: SortOrder
    nomorUrut?: SortOrder
    kodeAntrian?: SortOrder
    qrToken?: SortOrder
    qrPath?: SortOrder
    checkinAt?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    noShowAt?: SortOrder
    noShowBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendaftaranSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dokterId?: SortOrder
    diterimaOlehDokterId?: SortOrder
    nomorUrut?: SortOrder
    checkedInBy?: SortOrder
    noShowBy?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PendaftaranScalarRelationFilter = {
    is?: PendaftaranWhereInput
    isNot?: PendaftaranWhereInput
  }

  export type RekamMedisCountOrderByAggregateInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrder
    dokterId?: SortOrder
    tanggal?: SortOrder
    diagnosa?: SortOrder
    tindakan?: SortOrder
    resep?: SortOrder
    catatan?: SortOrder
    chainIndex?: SortOrder
    prevHash?: SortOrder
    blockHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekamMedisAvgOrderByAggregateInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrder
    dokterId?: SortOrder
    chainIndex?: SortOrder
  }

  export type RekamMedisMaxOrderByAggregateInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrder
    dokterId?: SortOrder
    tanggal?: SortOrder
    diagnosa?: SortOrder
    tindakan?: SortOrder
    resep?: SortOrder
    catatan?: SortOrder
    chainIndex?: SortOrder
    prevHash?: SortOrder
    blockHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekamMedisMinOrderByAggregateInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrder
    dokterId?: SortOrder
    tanggal?: SortOrder
    diagnosa?: SortOrder
    tindakan?: SortOrder
    resep?: SortOrder
    catatan?: SortOrder
    chainIndex?: SortOrder
    prevHash?: SortOrder
    blockHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekamMedisSumOrderByAggregateInput = {
    id?: SortOrder
    pendaftaranId?: SortOrder
    pasienId?: SortOrder
    dokterId?: SortOrder
    chainIndex?: SortOrder
  }

  export type JadwalDokterCountOrderByAggregateInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrder
    hari?: SortOrder
    jamMulai?: SortOrder
    jamSelesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JadwalDokterAvgOrderByAggregateInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrder
  }

  export type JadwalDokterMaxOrderByAggregateInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrder
    hari?: SortOrder
    jamMulai?: SortOrder
    jamSelesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JadwalDokterMinOrderByAggregateInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrder
    hari?: SortOrder
    jamMulai?: SortOrder
    jamSelesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JadwalDokterSumOrderByAggregateInput = {
    id?: SortOrder
    dokterId?: SortOrder
    pasienId?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type PembayaranCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kodeTagihan?: SortOrder
    jumlah?: SortOrder
    status?: SortOrder
    buktiPembayaran?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PembayaranAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jumlah?: SortOrder
  }

  export type PembayaranMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kodeTagihan?: SortOrder
    jumlah?: SortOrder
    status?: SortOrder
    buktiPembayaran?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PembayaranMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kodeTagihan?: SortOrder
    jumlah?: SortOrder
    status?: SortOrder
    buktiPembayaran?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PembayaranSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jumlah?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotifikasiCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    judul?: SortOrder
    pesan?: SortOrder
    tipe?: SortOrder
    link?: SortOrder
    dibaca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotifikasiAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotifikasiMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    judul?: SortOrder
    pesan?: SortOrder
    tipe?: SortOrder
    link?: SortOrder
    dibaca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotifikasiMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    judul?: SortOrder
    pesan?: SortOrder
    tipe?: SortOrder
    link?: SortOrder
    dibaca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotifikasiSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JadwalDokterCreateNestedManyWithoutDokterInput = {
    create?: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput> | JadwalDokterCreateWithoutDokterInput[] | JadwalDokterUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: JadwalDokterCreateOrConnectWithoutDokterInput | JadwalDokterCreateOrConnectWithoutDokterInput[]
    createMany?: JadwalDokterCreateManyDokterInputEnvelope
    connect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
  }

  export type PendaftaranCreateNestedManyWithoutUserInput = {
    create?: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput> | PendaftaranCreateWithoutUserInput[] | PendaftaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutUserInput | PendaftaranCreateOrConnectWithoutUserInput[]
    createMany?: PendaftaranCreateManyUserInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type PendaftaranCreateNestedManyWithoutDokterInput = {
    create?: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput> | PendaftaranCreateWithoutDokterInput[] | PendaftaranUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDokterInput | PendaftaranCreateOrConnectWithoutDokterInput[]
    createMany?: PendaftaranCreateManyDokterInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput = {
    create?: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput> | PendaftaranCreateWithoutDiterimaOlehDokterInput[] | PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput | PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput[]
    createMany?: PendaftaranCreateManyDiterimaOlehDokterInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type NotifikasiCreateNestedManyWithoutUserInput = {
    create?: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput> | NotifikasiCreateWithoutUserInput[] | NotifikasiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotifikasiCreateOrConnectWithoutUserInput | NotifikasiCreateOrConnectWithoutUserInput[]
    createMany?: NotifikasiCreateManyUserInputEnvelope
    connect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
  }

  export type PembayaranCreateNestedManyWithoutUserInput = {
    create?: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput> | PembayaranCreateWithoutUserInput[] | PembayaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutUserInput | PembayaranCreateOrConnectWithoutUserInput[]
    createMany?: PembayaranCreateManyUserInputEnvelope
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
  }

  export type RekamMedisCreateNestedManyWithoutDokterInput = {
    create?: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput> | RekamMedisCreateWithoutDokterInput[] | RekamMedisUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutDokterInput | RekamMedisCreateOrConnectWithoutDokterInput[]
    createMany?: RekamMedisCreateManyDokterInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type RekamMedisCreateNestedManyWithoutPasienInput = {
    create?: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput> | RekamMedisCreateWithoutPasienInput[] | RekamMedisUncheckedCreateWithoutPasienInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPasienInput | RekamMedisCreateOrConnectWithoutPasienInput[]
    createMany?: RekamMedisCreateManyPasienInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type JadwalDokterUncheckedCreateNestedManyWithoutDokterInput = {
    create?: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput> | JadwalDokterCreateWithoutDokterInput[] | JadwalDokterUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: JadwalDokterCreateOrConnectWithoutDokterInput | JadwalDokterCreateOrConnectWithoutDokterInput[]
    createMany?: JadwalDokterCreateManyDokterInputEnvelope
    connect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
  }

  export type PendaftaranUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput> | PendaftaranCreateWithoutUserInput[] | PendaftaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutUserInput | PendaftaranCreateOrConnectWithoutUserInput[]
    createMany?: PendaftaranCreateManyUserInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type PendaftaranUncheckedCreateNestedManyWithoutDokterInput = {
    create?: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput> | PendaftaranCreateWithoutDokterInput[] | PendaftaranUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDokterInput | PendaftaranCreateOrConnectWithoutDokterInput[]
    createMany?: PendaftaranCreateManyDokterInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput = {
    create?: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput> | PendaftaranCreateWithoutDiterimaOlehDokterInput[] | PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput | PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput[]
    createMany?: PendaftaranCreateManyDiterimaOlehDokterInputEnvelope
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
  }

  export type NotifikasiUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput> | NotifikasiCreateWithoutUserInput[] | NotifikasiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotifikasiCreateOrConnectWithoutUserInput | NotifikasiCreateOrConnectWithoutUserInput[]
    createMany?: NotifikasiCreateManyUserInputEnvelope
    connect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
  }

  export type PembayaranUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput> | PembayaranCreateWithoutUserInput[] | PembayaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutUserInput | PembayaranCreateOrConnectWithoutUserInput[]
    createMany?: PembayaranCreateManyUserInputEnvelope
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
  }

  export type RekamMedisUncheckedCreateNestedManyWithoutDokterInput = {
    create?: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput> | RekamMedisCreateWithoutDokterInput[] | RekamMedisUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutDokterInput | RekamMedisCreateOrConnectWithoutDokterInput[]
    createMany?: RekamMedisCreateManyDokterInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type RekamMedisUncheckedCreateNestedManyWithoutPasienInput = {
    create?: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput> | RekamMedisCreateWithoutPasienInput[] | RekamMedisUncheckedCreateWithoutPasienInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPasienInput | RekamMedisCreateOrConnectWithoutPasienInput[]
    createMany?: RekamMedisCreateManyPasienInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type JadwalDokterUpdateManyWithoutDokterNestedInput = {
    create?: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput> | JadwalDokterCreateWithoutDokterInput[] | JadwalDokterUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: JadwalDokterCreateOrConnectWithoutDokterInput | JadwalDokterCreateOrConnectWithoutDokterInput[]
    upsert?: JadwalDokterUpsertWithWhereUniqueWithoutDokterInput | JadwalDokterUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: JadwalDokterCreateManyDokterInputEnvelope
    set?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    disconnect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    delete?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    connect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    update?: JadwalDokterUpdateWithWhereUniqueWithoutDokterInput | JadwalDokterUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: JadwalDokterUpdateManyWithWhereWithoutDokterInput | JadwalDokterUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: JadwalDokterScalarWhereInput | JadwalDokterScalarWhereInput[]
  }

  export type PendaftaranUpdateManyWithoutUserNestedInput = {
    create?: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput> | PendaftaranCreateWithoutUserInput[] | PendaftaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutUserInput | PendaftaranCreateOrConnectWithoutUserInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutUserInput | PendaftaranUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PendaftaranCreateManyUserInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutUserInput | PendaftaranUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutUserInput | PendaftaranUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type PendaftaranUpdateManyWithoutDokterNestedInput = {
    create?: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput> | PendaftaranCreateWithoutDokterInput[] | PendaftaranUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDokterInput | PendaftaranCreateOrConnectWithoutDokterInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutDokterInput | PendaftaranUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: PendaftaranCreateManyDokterInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutDokterInput | PendaftaranUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutDokterInput | PendaftaranUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput = {
    create?: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput> | PendaftaranCreateWithoutDiterimaOlehDokterInput[] | PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput | PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutDiterimaOlehDokterInput | PendaftaranUpsertWithWhereUniqueWithoutDiterimaOlehDokterInput[]
    createMany?: PendaftaranCreateManyDiterimaOlehDokterInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutDiterimaOlehDokterInput | PendaftaranUpdateWithWhereUniqueWithoutDiterimaOlehDokterInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutDiterimaOlehDokterInput | PendaftaranUpdateManyWithWhereWithoutDiterimaOlehDokterInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type NotifikasiUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput> | NotifikasiCreateWithoutUserInput[] | NotifikasiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotifikasiCreateOrConnectWithoutUserInput | NotifikasiCreateOrConnectWithoutUserInput[]
    upsert?: NotifikasiUpsertWithWhereUniqueWithoutUserInput | NotifikasiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotifikasiCreateManyUserInputEnvelope
    set?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    disconnect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    delete?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    connect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    update?: NotifikasiUpdateWithWhereUniqueWithoutUserInput | NotifikasiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotifikasiUpdateManyWithWhereWithoutUserInput | NotifikasiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotifikasiScalarWhereInput | NotifikasiScalarWhereInput[]
  }

  export type PembayaranUpdateManyWithoutUserNestedInput = {
    create?: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput> | PembayaranCreateWithoutUserInput[] | PembayaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutUserInput | PembayaranCreateOrConnectWithoutUserInput[]
    upsert?: PembayaranUpsertWithWhereUniqueWithoutUserInput | PembayaranUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PembayaranCreateManyUserInputEnvelope
    set?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    disconnect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    delete?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    update?: PembayaranUpdateWithWhereUniqueWithoutUserInput | PembayaranUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PembayaranUpdateManyWithWhereWithoutUserInput | PembayaranUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
  }

  export type RekamMedisUpdateManyWithoutDokterNestedInput = {
    create?: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput> | RekamMedisCreateWithoutDokterInput[] | RekamMedisUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutDokterInput | RekamMedisCreateOrConnectWithoutDokterInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutDokterInput | RekamMedisUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: RekamMedisCreateManyDokterInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutDokterInput | RekamMedisUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutDokterInput | RekamMedisUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type RekamMedisUpdateManyWithoutPasienNestedInput = {
    create?: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput> | RekamMedisCreateWithoutPasienInput[] | RekamMedisUncheckedCreateWithoutPasienInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPasienInput | RekamMedisCreateOrConnectWithoutPasienInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutPasienInput | RekamMedisUpsertWithWhereUniqueWithoutPasienInput[]
    createMany?: RekamMedisCreateManyPasienInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutPasienInput | RekamMedisUpdateWithWhereUniqueWithoutPasienInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutPasienInput | RekamMedisUpdateManyWithWhereWithoutPasienInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput = {
    create?: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput> | JadwalDokterCreateWithoutDokterInput[] | JadwalDokterUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: JadwalDokterCreateOrConnectWithoutDokterInput | JadwalDokterCreateOrConnectWithoutDokterInput[]
    upsert?: JadwalDokterUpsertWithWhereUniqueWithoutDokterInput | JadwalDokterUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: JadwalDokterCreateManyDokterInputEnvelope
    set?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    disconnect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    delete?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    connect?: JadwalDokterWhereUniqueInput | JadwalDokterWhereUniqueInput[]
    update?: JadwalDokterUpdateWithWhereUniqueWithoutDokterInput | JadwalDokterUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: JadwalDokterUpdateManyWithWhereWithoutDokterInput | JadwalDokterUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: JadwalDokterScalarWhereInput | JadwalDokterScalarWhereInput[]
  }

  export type PendaftaranUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput> | PendaftaranCreateWithoutUserInput[] | PendaftaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutUserInput | PendaftaranCreateOrConnectWithoutUserInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutUserInput | PendaftaranUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PendaftaranCreateManyUserInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutUserInput | PendaftaranUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutUserInput | PendaftaranUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type PendaftaranUncheckedUpdateManyWithoutDokterNestedInput = {
    create?: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput> | PendaftaranCreateWithoutDokterInput[] | PendaftaranUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDokterInput | PendaftaranCreateOrConnectWithoutDokterInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutDokterInput | PendaftaranUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: PendaftaranCreateManyDokterInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutDokterInput | PendaftaranUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutDokterInput | PendaftaranUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput = {
    create?: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput> | PendaftaranCreateWithoutDiterimaOlehDokterInput[] | PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput[]
    connectOrCreate?: PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput | PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput[]
    upsert?: PendaftaranUpsertWithWhereUniqueWithoutDiterimaOlehDokterInput | PendaftaranUpsertWithWhereUniqueWithoutDiterimaOlehDokterInput[]
    createMany?: PendaftaranCreateManyDiterimaOlehDokterInputEnvelope
    set?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    disconnect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    delete?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    connect?: PendaftaranWhereUniqueInput | PendaftaranWhereUniqueInput[]
    update?: PendaftaranUpdateWithWhereUniqueWithoutDiterimaOlehDokterInput | PendaftaranUpdateWithWhereUniqueWithoutDiterimaOlehDokterInput[]
    updateMany?: PendaftaranUpdateManyWithWhereWithoutDiterimaOlehDokterInput | PendaftaranUpdateManyWithWhereWithoutDiterimaOlehDokterInput[]
    deleteMany?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
  }

  export type NotifikasiUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput> | NotifikasiCreateWithoutUserInput[] | NotifikasiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotifikasiCreateOrConnectWithoutUserInput | NotifikasiCreateOrConnectWithoutUserInput[]
    upsert?: NotifikasiUpsertWithWhereUniqueWithoutUserInput | NotifikasiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotifikasiCreateManyUserInputEnvelope
    set?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    disconnect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    delete?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    connect?: NotifikasiWhereUniqueInput | NotifikasiWhereUniqueInput[]
    update?: NotifikasiUpdateWithWhereUniqueWithoutUserInput | NotifikasiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotifikasiUpdateManyWithWhereWithoutUserInput | NotifikasiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotifikasiScalarWhereInput | NotifikasiScalarWhereInput[]
  }

  export type PembayaranUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput> | PembayaranCreateWithoutUserInput[] | PembayaranUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutUserInput | PembayaranCreateOrConnectWithoutUserInput[]
    upsert?: PembayaranUpsertWithWhereUniqueWithoutUserInput | PembayaranUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PembayaranCreateManyUserInputEnvelope
    set?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    disconnect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    delete?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    update?: PembayaranUpdateWithWhereUniqueWithoutUserInput | PembayaranUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PembayaranUpdateManyWithWhereWithoutUserInput | PembayaranUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
  }

  export type RekamMedisUncheckedUpdateManyWithoutDokterNestedInput = {
    create?: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput> | RekamMedisCreateWithoutDokterInput[] | RekamMedisUncheckedCreateWithoutDokterInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutDokterInput | RekamMedisCreateOrConnectWithoutDokterInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutDokterInput | RekamMedisUpsertWithWhereUniqueWithoutDokterInput[]
    createMany?: RekamMedisCreateManyDokterInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutDokterInput | RekamMedisUpdateWithWhereUniqueWithoutDokterInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutDokterInput | RekamMedisUpdateManyWithWhereWithoutDokterInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type RekamMedisUncheckedUpdateManyWithoutPasienNestedInput = {
    create?: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput> | RekamMedisCreateWithoutPasienInput[] | RekamMedisUncheckedCreateWithoutPasienInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPasienInput | RekamMedisCreateOrConnectWithoutPasienInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutPasienInput | RekamMedisUpsertWithWhereUniqueWithoutPasienInput[]
    createMany?: RekamMedisCreateManyPasienInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutPasienInput | RekamMedisUpdateWithWhereUniqueWithoutPasienInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutPasienInput | RekamMedisUpdateManyWithWhereWithoutPasienInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPendaftaransInput = {
    create?: XOR<UserCreateWithoutPendaftaransInput, UserUncheckedCreateWithoutPendaftaransInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftaransInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPendaftarDokterInput = {
    create?: XOR<UserCreateWithoutPendaftarDokterInput, UserUncheckedCreateWithoutPendaftarDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftarDokterInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPendaftarDiterimaInput = {
    create?: XOR<UserCreateWithoutPendaftarDiterimaInput, UserUncheckedCreateWithoutPendaftarDiterimaInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftarDiterimaInput
    connect?: UserWhereUniqueInput
  }

  export type RekamMedisCreateNestedManyWithoutPendaftaranInput = {
    create?: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput> | RekamMedisCreateWithoutPendaftaranInput[] | RekamMedisUncheckedCreateWithoutPendaftaranInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPendaftaranInput | RekamMedisCreateOrConnectWithoutPendaftaranInput[]
    createMany?: RekamMedisCreateManyPendaftaranInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type RekamMedisUncheckedCreateNestedManyWithoutPendaftaranInput = {
    create?: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput> | RekamMedisCreateWithoutPendaftaranInput[] | RekamMedisUncheckedCreateWithoutPendaftaranInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPendaftaranInput | RekamMedisCreateOrConnectWithoutPendaftaranInput[]
    createMany?: RekamMedisCreateManyPendaftaranInputEnvelope
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPendaftaransNestedInput = {
    create?: XOR<UserCreateWithoutPendaftaransInput, UserUncheckedCreateWithoutPendaftaransInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftaransInput
    upsert?: UserUpsertWithoutPendaftaransInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPendaftaransInput, UserUpdateWithoutPendaftaransInput>, UserUncheckedUpdateWithoutPendaftaransInput>
  }

  export type UserUpdateOneWithoutPendaftarDokterNestedInput = {
    create?: XOR<UserCreateWithoutPendaftarDokterInput, UserUncheckedCreateWithoutPendaftarDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftarDokterInput
    upsert?: UserUpsertWithoutPendaftarDokterInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPendaftarDokterInput, UserUpdateWithoutPendaftarDokterInput>, UserUncheckedUpdateWithoutPendaftarDokterInput>
  }

  export type UserUpdateOneWithoutPendaftarDiterimaNestedInput = {
    create?: XOR<UserCreateWithoutPendaftarDiterimaInput, UserUncheckedCreateWithoutPendaftarDiterimaInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendaftarDiterimaInput
    upsert?: UserUpsertWithoutPendaftarDiterimaInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPendaftarDiterimaInput, UserUpdateWithoutPendaftarDiterimaInput>, UserUncheckedUpdateWithoutPendaftarDiterimaInput>
  }

  export type RekamMedisUpdateManyWithoutPendaftaranNestedInput = {
    create?: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput> | RekamMedisCreateWithoutPendaftaranInput[] | RekamMedisUncheckedCreateWithoutPendaftaranInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPendaftaranInput | RekamMedisCreateOrConnectWithoutPendaftaranInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutPendaftaranInput | RekamMedisUpsertWithWhereUniqueWithoutPendaftaranInput[]
    createMany?: RekamMedisCreateManyPendaftaranInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutPendaftaranInput | RekamMedisUpdateWithWhereUniqueWithoutPendaftaranInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutPendaftaranInput | RekamMedisUpdateManyWithWhereWithoutPendaftaranInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type RekamMedisUncheckedUpdateManyWithoutPendaftaranNestedInput = {
    create?: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput> | RekamMedisCreateWithoutPendaftaranInput[] | RekamMedisUncheckedCreateWithoutPendaftaranInput[]
    connectOrCreate?: RekamMedisCreateOrConnectWithoutPendaftaranInput | RekamMedisCreateOrConnectWithoutPendaftaranInput[]
    upsert?: RekamMedisUpsertWithWhereUniqueWithoutPendaftaranInput | RekamMedisUpsertWithWhereUniqueWithoutPendaftaranInput[]
    createMany?: RekamMedisCreateManyPendaftaranInputEnvelope
    set?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    disconnect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    delete?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    connect?: RekamMedisWhereUniqueInput | RekamMedisWhereUniqueInput[]
    update?: RekamMedisUpdateWithWhereUniqueWithoutPendaftaranInput | RekamMedisUpdateWithWhereUniqueWithoutPendaftaranInput[]
    updateMany?: RekamMedisUpdateManyWithWhereWithoutPendaftaranInput | RekamMedisUpdateManyWithWhereWithoutPendaftaranInput[]
    deleteMany?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRekamMedisDokterInput = {
    create?: XOR<UserCreateWithoutRekamMedisDokterInput, UserUncheckedCreateWithoutRekamMedisDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekamMedisDokterInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRekamMedisPasienInput = {
    create?: XOR<UserCreateWithoutRekamMedisPasienInput, UserUncheckedCreateWithoutRekamMedisPasienInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekamMedisPasienInput
    connect?: UserWhereUniqueInput
  }

  export type PendaftaranCreateNestedOneWithoutRekamMedisInput = {
    create?: XOR<PendaftaranCreateWithoutRekamMedisInput, PendaftaranUncheckedCreateWithoutRekamMedisInput>
    connectOrCreate?: PendaftaranCreateOrConnectWithoutRekamMedisInput
    connect?: PendaftaranWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRekamMedisDokterNestedInput = {
    create?: XOR<UserCreateWithoutRekamMedisDokterInput, UserUncheckedCreateWithoutRekamMedisDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekamMedisDokterInput
    upsert?: UserUpsertWithoutRekamMedisDokterInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRekamMedisDokterInput, UserUpdateWithoutRekamMedisDokterInput>, UserUncheckedUpdateWithoutRekamMedisDokterInput>
  }

  export type UserUpdateOneWithoutRekamMedisPasienNestedInput = {
    create?: XOR<UserCreateWithoutRekamMedisPasienInput, UserUncheckedCreateWithoutRekamMedisPasienInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekamMedisPasienInput
    upsert?: UserUpsertWithoutRekamMedisPasienInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRekamMedisPasienInput, UserUpdateWithoutRekamMedisPasienInput>, UserUncheckedUpdateWithoutRekamMedisPasienInput>
  }

  export type PendaftaranUpdateOneRequiredWithoutRekamMedisNestedInput = {
    create?: XOR<PendaftaranCreateWithoutRekamMedisInput, PendaftaranUncheckedCreateWithoutRekamMedisInput>
    connectOrCreate?: PendaftaranCreateOrConnectWithoutRekamMedisInput
    upsert?: PendaftaranUpsertWithoutRekamMedisInput
    connect?: PendaftaranWhereUniqueInput
    update?: XOR<XOR<PendaftaranUpdateToOneWithWhereWithoutRekamMedisInput, PendaftaranUpdateWithoutRekamMedisInput>, PendaftaranUncheckedUpdateWithoutRekamMedisInput>
  }

  export type UserCreateNestedOneWithoutJadwalDokterInput = {
    create?: XOR<UserCreateWithoutJadwalDokterInput, UserUncheckedCreateWithoutJadwalDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalDokterInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutJadwalDokterNestedInput = {
    create?: XOR<UserCreateWithoutJadwalDokterInput, UserUncheckedCreateWithoutJadwalDokterInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalDokterInput
    upsert?: UserUpsertWithoutJadwalDokterInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJadwalDokterInput, UserUpdateWithoutJadwalDokterInput>, UserUncheckedUpdateWithoutJadwalDokterInput>
  }

  export type UserCreateNestedOneWithoutPembayaransInput = {
    create?: XOR<UserCreateWithoutPembayaransInput, UserUncheckedCreateWithoutPembayaransInput>
    connectOrCreate?: UserCreateOrConnectWithoutPembayaransInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutPembayaransNestedInput = {
    create?: XOR<UserCreateWithoutPembayaransInput, UserUncheckedCreateWithoutPembayaransInput>
    connectOrCreate?: UserCreateOrConnectWithoutPembayaransInput
    upsert?: UserUpsertWithoutPembayaransInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPembayaransInput, UserUpdateWithoutPembayaransInput>, UserUncheckedUpdateWithoutPembayaransInput>
  }

  export type UserCreateNestedOneWithoutNotifikasisInput = {
    create?: XOR<UserCreateWithoutNotifikasisInput, UserUncheckedCreateWithoutNotifikasisInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotifikasisInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotifikasisNestedInput = {
    create?: XOR<UserCreateWithoutNotifikasisInput, UserUncheckedCreateWithoutNotifikasisInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotifikasisInput
    upsert?: UserUpsertWithoutNotifikasisInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotifikasisInput, UserUpdateWithoutNotifikasisInput>, UserUncheckedUpdateWithoutNotifikasisInput>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JadwalDokterCreateWithoutDokterInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type JadwalDokterUncheckedCreateWithoutDokterInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type JadwalDokterCreateOrConnectWithoutDokterInput = {
    where: JadwalDokterWhereUniqueInput
    create: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput>
  }

  export type JadwalDokterCreateManyDokterInputEnvelope = {
    data: JadwalDokterCreateManyDokterInput | JadwalDokterCreateManyDokterInput[]
    skipDuplicates?: boolean
  }

  export type PendaftaranCreateWithoutUserInput = {
    id?: bigint | number
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dokter?: UserCreateNestedOneWithoutPendaftarDokterInput
    diterimaOlehDokter?: UserCreateNestedOneWithoutPendaftarDiterimaInput
    rekamMedis?: RekamMedisCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    dokterId?: bigint | number | null
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    rekamMedis?: RekamMedisUncheckedCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranCreateOrConnectWithoutUserInput = {
    where: PendaftaranWhereUniqueInput
    create: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput>
  }

  export type PendaftaranCreateManyUserInputEnvelope = {
    data: PendaftaranCreateManyUserInput | PendaftaranCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PendaftaranCreateWithoutDokterInput = {
    id?: bigint | number
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPendaftaransInput
    diterimaOlehDokter?: UserCreateNestedOneWithoutPendaftarDiterimaInput
    rekamMedis?: RekamMedisCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranUncheckedCreateWithoutDokterInput = {
    id?: bigint | number
    userId: bigint | number
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    rekamMedis?: RekamMedisUncheckedCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranCreateOrConnectWithoutDokterInput = {
    where: PendaftaranWhereUniqueInput
    create: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput>
  }

  export type PendaftaranCreateManyDokterInputEnvelope = {
    data: PendaftaranCreateManyDokterInput | PendaftaranCreateManyDokterInput[]
    skipDuplicates?: boolean
  }

  export type PendaftaranCreateWithoutDiterimaOlehDokterInput = {
    id?: bigint | number
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPendaftaransInput
    dokter?: UserCreateNestedOneWithoutPendaftarDokterInput
    rekamMedis?: RekamMedisCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput = {
    id?: bigint | number
    userId: bigint | number
    dokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    rekamMedis?: RekamMedisUncheckedCreateNestedManyWithoutPendaftaranInput
  }

  export type PendaftaranCreateOrConnectWithoutDiterimaOlehDokterInput = {
    where: PendaftaranWhereUniqueInput
    create: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput>
  }

  export type PendaftaranCreateManyDiterimaOlehDokterInputEnvelope = {
    data: PendaftaranCreateManyDiterimaOlehDokterInput | PendaftaranCreateManyDiterimaOlehDokterInput[]
    skipDuplicates?: boolean
  }

  export type NotifikasiCreateWithoutUserInput = {
    id?: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type NotifikasiUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type NotifikasiCreateOrConnectWithoutUserInput = {
    where: NotifikasiWhereUniqueInput
    create: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput>
  }

  export type NotifikasiCreateManyUserInputEnvelope = {
    data: NotifikasiCreateManyUserInput | NotifikasiCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PembayaranCreateWithoutUserInput = {
    id?: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PembayaranUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PembayaranCreateOrConnectWithoutUserInput = {
    where: PembayaranWhereUniqueInput
    create: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput>
  }

  export type PembayaranCreateManyUserInputEnvelope = {
    data: PembayaranCreateManyUserInput | PembayaranCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RekamMedisCreateWithoutDokterInput = {
    id?: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    pasien?: UserCreateNestedOneWithoutRekamMedisPasienInput
    pendaftaran: PendaftaranCreateNestedOneWithoutRekamMedisInput
  }

  export type RekamMedisUncheckedCreateWithoutDokterInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    pasienId?: bigint | number | null
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisCreateOrConnectWithoutDokterInput = {
    where: RekamMedisWhereUniqueInput
    create: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput>
  }

  export type RekamMedisCreateManyDokterInputEnvelope = {
    data: RekamMedisCreateManyDokterInput | RekamMedisCreateManyDokterInput[]
    skipDuplicates?: boolean
  }

  export type RekamMedisCreateWithoutPasienInput = {
    id?: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dokter: UserCreateNestedOneWithoutRekamMedisDokterInput
    pendaftaran: PendaftaranCreateNestedOneWithoutRekamMedisInput
  }

  export type RekamMedisUncheckedCreateWithoutPasienInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisCreateOrConnectWithoutPasienInput = {
    where: RekamMedisWhereUniqueInput
    create: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput>
  }

  export type RekamMedisCreateManyPasienInputEnvelope = {
    data: RekamMedisCreateManyPasienInput | RekamMedisCreateManyPasienInput[]
    skipDuplicates?: boolean
  }

  export type JadwalDokterUpsertWithWhereUniqueWithoutDokterInput = {
    where: JadwalDokterWhereUniqueInput
    update: XOR<JadwalDokterUpdateWithoutDokterInput, JadwalDokterUncheckedUpdateWithoutDokterInput>
    create: XOR<JadwalDokterCreateWithoutDokterInput, JadwalDokterUncheckedCreateWithoutDokterInput>
  }

  export type JadwalDokterUpdateWithWhereUniqueWithoutDokterInput = {
    where: JadwalDokterWhereUniqueInput
    data: XOR<JadwalDokterUpdateWithoutDokterInput, JadwalDokterUncheckedUpdateWithoutDokterInput>
  }

  export type JadwalDokterUpdateManyWithWhereWithoutDokterInput = {
    where: JadwalDokterScalarWhereInput
    data: XOR<JadwalDokterUpdateManyMutationInput, JadwalDokterUncheckedUpdateManyWithoutDokterInput>
  }

  export type JadwalDokterScalarWhereInput = {
    AND?: JadwalDokterScalarWhereInput | JadwalDokterScalarWhereInput[]
    OR?: JadwalDokterScalarWhereInput[]
    NOT?: JadwalDokterScalarWhereInput | JadwalDokterScalarWhereInput[]
    id?: BigIntFilter<"JadwalDokter"> | bigint | number
    dokterId?: BigIntFilter<"JadwalDokter"> | bigint | number
    pasienId?: BigIntNullableFilter<"JadwalDokter"> | bigint | number | null
    hari?: StringFilter<"JadwalDokter"> | string
    jamMulai?: DateTimeFilter<"JadwalDokter"> | Date | string
    jamSelesai?: DateTimeFilter<"JadwalDokter"> | Date | string
    createdAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"JadwalDokter"> | Date | string | null
  }

  export type PendaftaranUpsertWithWhereUniqueWithoutUserInput = {
    where: PendaftaranWhereUniqueInput
    update: XOR<PendaftaranUpdateWithoutUserInput, PendaftaranUncheckedUpdateWithoutUserInput>
    create: XOR<PendaftaranCreateWithoutUserInput, PendaftaranUncheckedCreateWithoutUserInput>
  }

  export type PendaftaranUpdateWithWhereUniqueWithoutUserInput = {
    where: PendaftaranWhereUniqueInput
    data: XOR<PendaftaranUpdateWithoutUserInput, PendaftaranUncheckedUpdateWithoutUserInput>
  }

  export type PendaftaranUpdateManyWithWhereWithoutUserInput = {
    where: PendaftaranScalarWhereInput
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyWithoutUserInput>
  }

  export type PendaftaranScalarWhereInput = {
    AND?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
    OR?: PendaftaranScalarWhereInput[]
    NOT?: PendaftaranScalarWhereInput | PendaftaranScalarWhereInput[]
    id?: BigIntFilter<"Pendaftaran"> | bigint | number
    userId?: BigIntFilter<"Pendaftaran"> | bigint | number
    dokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    diterimaOlehDokterId?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    nama?: StringFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeFilter<"Pendaftaran"> | Date | string
    jenisKelamin?: StringFilter<"Pendaftaran"> | string
    noHp?: StringFilter<"Pendaftaran"> | string
    nik?: StringFilter<"Pendaftaran"> | string
    keluhan?: StringFilter<"Pendaftaran"> | string
    tanggalKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    jamKunjungan?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    spesialis?: StringNullableFilter<"Pendaftaran"> | string | null
    status?: StringFilter<"Pendaftaran"> | string
    nomorUrut?: IntNullableFilter<"Pendaftaran"> | number | null
    kodeAntrian?: StringNullableFilter<"Pendaftaran"> | string | null
    qrToken?: StringNullableFilter<"Pendaftaran"> | string | null
    qrPath?: StringNullableFilter<"Pendaftaran"> | string | null
    checkinAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    checkedInBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    noShowAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    noShowBy?: BigIntNullableFilter<"Pendaftaran"> | bigint | number | null
    createdAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pendaftaran"> | Date | string | null
  }

  export type PendaftaranUpsertWithWhereUniqueWithoutDokterInput = {
    where: PendaftaranWhereUniqueInput
    update: XOR<PendaftaranUpdateWithoutDokterInput, PendaftaranUncheckedUpdateWithoutDokterInput>
    create: XOR<PendaftaranCreateWithoutDokterInput, PendaftaranUncheckedCreateWithoutDokterInput>
  }

  export type PendaftaranUpdateWithWhereUniqueWithoutDokterInput = {
    where: PendaftaranWhereUniqueInput
    data: XOR<PendaftaranUpdateWithoutDokterInput, PendaftaranUncheckedUpdateWithoutDokterInput>
  }

  export type PendaftaranUpdateManyWithWhereWithoutDokterInput = {
    where: PendaftaranScalarWhereInput
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyWithoutDokterInput>
  }

  export type PendaftaranUpsertWithWhereUniqueWithoutDiterimaOlehDokterInput = {
    where: PendaftaranWhereUniqueInput
    update: XOR<PendaftaranUpdateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedUpdateWithoutDiterimaOlehDokterInput>
    create: XOR<PendaftaranCreateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedCreateWithoutDiterimaOlehDokterInput>
  }

  export type PendaftaranUpdateWithWhereUniqueWithoutDiterimaOlehDokterInput = {
    where: PendaftaranWhereUniqueInput
    data: XOR<PendaftaranUpdateWithoutDiterimaOlehDokterInput, PendaftaranUncheckedUpdateWithoutDiterimaOlehDokterInput>
  }

  export type PendaftaranUpdateManyWithWhereWithoutDiterimaOlehDokterInput = {
    where: PendaftaranScalarWhereInput
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterInput>
  }

  export type NotifikasiUpsertWithWhereUniqueWithoutUserInput = {
    where: NotifikasiWhereUniqueInput
    update: XOR<NotifikasiUpdateWithoutUserInput, NotifikasiUncheckedUpdateWithoutUserInput>
    create: XOR<NotifikasiCreateWithoutUserInput, NotifikasiUncheckedCreateWithoutUserInput>
  }

  export type NotifikasiUpdateWithWhereUniqueWithoutUserInput = {
    where: NotifikasiWhereUniqueInput
    data: XOR<NotifikasiUpdateWithoutUserInput, NotifikasiUncheckedUpdateWithoutUserInput>
  }

  export type NotifikasiUpdateManyWithWhereWithoutUserInput = {
    where: NotifikasiScalarWhereInput
    data: XOR<NotifikasiUpdateManyMutationInput, NotifikasiUncheckedUpdateManyWithoutUserInput>
  }

  export type NotifikasiScalarWhereInput = {
    AND?: NotifikasiScalarWhereInput | NotifikasiScalarWhereInput[]
    OR?: NotifikasiScalarWhereInput[]
    NOT?: NotifikasiScalarWhereInput | NotifikasiScalarWhereInput[]
    id?: BigIntFilter<"Notifikasi"> | bigint | number
    userId?: BigIntFilter<"Notifikasi"> | bigint | number
    judul?: StringFilter<"Notifikasi"> | string
    pesan?: StringFilter<"Notifikasi"> | string
    tipe?: StringNullableFilter<"Notifikasi"> | string | null
    link?: StringNullableFilter<"Notifikasi"> | string | null
    dibaca?: BoolFilter<"Notifikasi"> | boolean
    createdAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Notifikasi"> | Date | string | null
  }

  export type PembayaranUpsertWithWhereUniqueWithoutUserInput = {
    where: PembayaranWhereUniqueInput
    update: XOR<PembayaranUpdateWithoutUserInput, PembayaranUncheckedUpdateWithoutUserInput>
    create: XOR<PembayaranCreateWithoutUserInput, PembayaranUncheckedCreateWithoutUserInput>
  }

  export type PembayaranUpdateWithWhereUniqueWithoutUserInput = {
    where: PembayaranWhereUniqueInput
    data: XOR<PembayaranUpdateWithoutUserInput, PembayaranUncheckedUpdateWithoutUserInput>
  }

  export type PembayaranUpdateManyWithWhereWithoutUserInput = {
    where: PembayaranScalarWhereInput
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyWithoutUserInput>
  }

  export type PembayaranScalarWhereInput = {
    AND?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
    OR?: PembayaranScalarWhereInput[]
    NOT?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
    id?: BigIntFilter<"Pembayaran"> | bigint | number
    userId?: BigIntFilter<"Pembayaran"> | bigint | number
    kodeTagihan?: StringFilter<"Pembayaran"> | string
    jumlah?: DecimalFilter<"Pembayaran"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Pembayaran"> | string
    buktiPembayaran?: StringNullableFilter<"Pembayaran"> | string | null
    createdAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Pembayaran"> | Date | string | null
  }

  export type RekamMedisUpsertWithWhereUniqueWithoutDokterInput = {
    where: RekamMedisWhereUniqueInput
    update: XOR<RekamMedisUpdateWithoutDokterInput, RekamMedisUncheckedUpdateWithoutDokterInput>
    create: XOR<RekamMedisCreateWithoutDokterInput, RekamMedisUncheckedCreateWithoutDokterInput>
  }

  export type RekamMedisUpdateWithWhereUniqueWithoutDokterInput = {
    where: RekamMedisWhereUniqueInput
    data: XOR<RekamMedisUpdateWithoutDokterInput, RekamMedisUncheckedUpdateWithoutDokterInput>
  }

  export type RekamMedisUpdateManyWithWhereWithoutDokterInput = {
    where: RekamMedisScalarWhereInput
    data: XOR<RekamMedisUpdateManyMutationInput, RekamMedisUncheckedUpdateManyWithoutDokterInput>
  }

  export type RekamMedisScalarWhereInput = {
    AND?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
    OR?: RekamMedisScalarWhereInput[]
    NOT?: RekamMedisScalarWhereInput | RekamMedisScalarWhereInput[]
    id?: BigIntFilter<"RekamMedis"> | bigint | number
    pendaftaranId?: BigIntFilter<"RekamMedis"> | bigint | number
    pasienId?: BigIntNullableFilter<"RekamMedis"> | bigint | number | null
    dokterId?: BigIntFilter<"RekamMedis"> | bigint | number
    tanggal?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    diagnosa?: StringFilter<"RekamMedis"> | string
    tindakan?: StringFilter<"RekamMedis"> | string
    resep?: StringNullableFilter<"RekamMedis"> | string | null
    catatan?: StringNullableFilter<"RekamMedis"> | string | null
    chainIndex?: IntNullableFilter<"RekamMedis"> | number | null
    prevHash?: StringNullableFilter<"RekamMedis"> | string | null
    blockHash?: StringNullableFilter<"RekamMedis"> | string | null
    createdAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"RekamMedis"> | Date | string | null
  }

  export type RekamMedisUpsertWithWhereUniqueWithoutPasienInput = {
    where: RekamMedisWhereUniqueInput
    update: XOR<RekamMedisUpdateWithoutPasienInput, RekamMedisUncheckedUpdateWithoutPasienInput>
    create: XOR<RekamMedisCreateWithoutPasienInput, RekamMedisUncheckedCreateWithoutPasienInput>
  }

  export type RekamMedisUpdateWithWhereUniqueWithoutPasienInput = {
    where: RekamMedisWhereUniqueInput
    data: XOR<RekamMedisUpdateWithoutPasienInput, RekamMedisUncheckedUpdateWithoutPasienInput>
  }

  export type RekamMedisUpdateManyWithWhereWithoutPasienInput = {
    where: RekamMedisScalarWhereInput
    data: XOR<RekamMedisUpdateManyMutationInput, RekamMedisUncheckedUpdateManyWithoutPasienInput>
  }

  export type UserCreateWithoutPendaftaransInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutPendaftaransInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutPendaftaransInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendaftaransInput, UserUncheckedCreateWithoutPendaftaransInput>
  }

  export type UserCreateWithoutPendaftarDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutPendaftarDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutPendaftarDokterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendaftarDokterInput, UserUncheckedCreateWithoutPendaftarDokterInput>
  }

  export type UserCreateWithoutPendaftarDiterimaInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutPendaftarDiterimaInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutPendaftarDiterimaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendaftarDiterimaInput, UserUncheckedCreateWithoutPendaftarDiterimaInput>
  }

  export type RekamMedisCreateWithoutPendaftaranInput = {
    id?: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dokter: UserCreateNestedOneWithoutRekamMedisDokterInput
    pasien?: UserCreateNestedOneWithoutRekamMedisPasienInput
  }

  export type RekamMedisUncheckedCreateWithoutPendaftaranInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisCreateOrConnectWithoutPendaftaranInput = {
    where: RekamMedisWhereUniqueInput
    create: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput>
  }

  export type RekamMedisCreateManyPendaftaranInputEnvelope = {
    data: RekamMedisCreateManyPendaftaranInput | RekamMedisCreateManyPendaftaranInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPendaftaransInput = {
    update: XOR<UserUpdateWithoutPendaftaransInput, UserUncheckedUpdateWithoutPendaftaransInput>
    create: XOR<UserCreateWithoutPendaftaransInput, UserUncheckedCreateWithoutPendaftaransInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPendaftaransInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPendaftaransInput, UserUncheckedUpdateWithoutPendaftaransInput>
  }

  export type UserUpdateWithoutPendaftaransInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutPendaftaransInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserUpsertWithoutPendaftarDokterInput = {
    update: XOR<UserUpdateWithoutPendaftarDokterInput, UserUncheckedUpdateWithoutPendaftarDokterInput>
    create: XOR<UserCreateWithoutPendaftarDokterInput, UserUncheckedCreateWithoutPendaftarDokterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPendaftarDokterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPendaftarDokterInput, UserUncheckedUpdateWithoutPendaftarDokterInput>
  }

  export type UserUpdateWithoutPendaftarDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutPendaftarDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserUpsertWithoutPendaftarDiterimaInput = {
    update: XOR<UserUpdateWithoutPendaftarDiterimaInput, UserUncheckedUpdateWithoutPendaftarDiterimaInput>
    create: XOR<UserCreateWithoutPendaftarDiterimaInput, UserUncheckedCreateWithoutPendaftarDiterimaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPendaftarDiterimaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPendaftarDiterimaInput, UserUncheckedUpdateWithoutPendaftarDiterimaInput>
  }

  export type UserUpdateWithoutPendaftarDiterimaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutPendaftarDiterimaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type RekamMedisUpsertWithWhereUniqueWithoutPendaftaranInput = {
    where: RekamMedisWhereUniqueInput
    update: XOR<RekamMedisUpdateWithoutPendaftaranInput, RekamMedisUncheckedUpdateWithoutPendaftaranInput>
    create: XOR<RekamMedisCreateWithoutPendaftaranInput, RekamMedisUncheckedCreateWithoutPendaftaranInput>
  }

  export type RekamMedisUpdateWithWhereUniqueWithoutPendaftaranInput = {
    where: RekamMedisWhereUniqueInput
    data: XOR<RekamMedisUpdateWithoutPendaftaranInput, RekamMedisUncheckedUpdateWithoutPendaftaranInput>
  }

  export type RekamMedisUpdateManyWithWhereWithoutPendaftaranInput = {
    where: RekamMedisScalarWhereInput
    data: XOR<RekamMedisUpdateManyMutationInput, RekamMedisUncheckedUpdateManyWithoutPendaftaranInput>
  }

  export type UserCreateWithoutRekamMedisDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutRekamMedisDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutRekamMedisDokterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRekamMedisDokterInput, UserUncheckedCreateWithoutRekamMedisDokterInput>
  }

  export type UserCreateWithoutRekamMedisPasienInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
  }

  export type UserUncheckedCreateWithoutRekamMedisPasienInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
  }

  export type UserCreateOrConnectWithoutRekamMedisPasienInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRekamMedisPasienInput, UserUncheckedCreateWithoutRekamMedisPasienInput>
  }

  export type PendaftaranCreateWithoutRekamMedisInput = {
    id?: bigint | number
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPendaftaransInput
    dokter?: UserCreateNestedOneWithoutPendaftarDokterInput
    diterimaOlehDokter?: UserCreateNestedOneWithoutPendaftarDiterimaInput
  }

  export type PendaftaranUncheckedCreateWithoutRekamMedisInput = {
    id?: bigint | number
    userId: bigint | number
    dokterId?: bigint | number | null
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PendaftaranCreateOrConnectWithoutRekamMedisInput = {
    where: PendaftaranWhereUniqueInput
    create: XOR<PendaftaranCreateWithoutRekamMedisInput, PendaftaranUncheckedCreateWithoutRekamMedisInput>
  }

  export type UserUpsertWithoutRekamMedisDokterInput = {
    update: XOR<UserUpdateWithoutRekamMedisDokterInput, UserUncheckedUpdateWithoutRekamMedisDokterInput>
    create: XOR<UserCreateWithoutRekamMedisDokterInput, UserUncheckedCreateWithoutRekamMedisDokterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRekamMedisDokterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRekamMedisDokterInput, UserUncheckedUpdateWithoutRekamMedisDokterInput>
  }

  export type UserUpdateWithoutRekamMedisDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutRekamMedisDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserUpsertWithoutRekamMedisPasienInput = {
    update: XOR<UserUpdateWithoutRekamMedisPasienInput, UserUncheckedUpdateWithoutRekamMedisPasienInput>
    create: XOR<UserCreateWithoutRekamMedisPasienInput, UserUncheckedCreateWithoutRekamMedisPasienInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRekamMedisPasienInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRekamMedisPasienInput, UserUncheckedUpdateWithoutRekamMedisPasienInput>
  }

  export type UserUpdateWithoutRekamMedisPasienInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
  }

  export type UserUncheckedUpdateWithoutRekamMedisPasienInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
  }

  export type PendaftaranUpsertWithoutRekamMedisInput = {
    update: XOR<PendaftaranUpdateWithoutRekamMedisInput, PendaftaranUncheckedUpdateWithoutRekamMedisInput>
    create: XOR<PendaftaranCreateWithoutRekamMedisInput, PendaftaranUncheckedCreateWithoutRekamMedisInput>
    where?: PendaftaranWhereInput
  }

  export type PendaftaranUpdateToOneWithWhereWithoutRekamMedisInput = {
    where?: PendaftaranWhereInput
    data: XOR<PendaftaranUpdateWithoutRekamMedisInput, PendaftaranUncheckedUpdateWithoutRekamMedisInput>
  }

  export type PendaftaranUpdateWithoutRekamMedisInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPendaftaransNestedInput
    dokter?: UserUpdateOneWithoutPendaftarDokterNestedInput
    diterimaOlehDokter?: UserUpdateOneWithoutPendaftarDiterimaNestedInput
  }

  export type PendaftaranUncheckedUpdateWithoutRekamMedisInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutJadwalDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutJadwalDokterInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutJadwalDokterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJadwalDokterInput, UserUncheckedCreateWithoutJadwalDokterInput>
  }

  export type UserUpsertWithoutJadwalDokterInput = {
    update: XOR<UserUpdateWithoutJadwalDokterInput, UserUncheckedUpdateWithoutJadwalDokterInput>
    create: XOR<UserCreateWithoutJadwalDokterInput, UserUncheckedCreateWithoutJadwalDokterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJadwalDokterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJadwalDokterInput, UserUncheckedUpdateWithoutJadwalDokterInput>
  }

  export type UserUpdateWithoutJadwalDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutJadwalDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserCreateWithoutPembayaransInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutPembayaransInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    notifikasis?: NotifikasiUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutPembayaransInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPembayaransInput, UserUncheckedCreateWithoutPembayaransInput>
  }

  export type UserUpsertWithoutPembayaransInput = {
    update: XOR<UserUpdateWithoutPembayaransInput, UserUncheckedUpdateWithoutPembayaransInput>
    create: XOR<UserCreateWithoutPembayaransInput, UserUncheckedCreateWithoutPembayaransInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPembayaransInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPembayaransInput, UserUncheckedUpdateWithoutPembayaransInput>
  }

  export type UserUpdateWithoutPembayaransInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutPembayaransInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    notifikasis?: NotifikasiUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type UserCreateWithoutNotifikasisInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranCreateNestedManyWithoutDiterimaOlehDokterInput
    pembayarans?: PembayaranCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisCreateNestedManyWithoutPasienInput
  }

  export type UserUncheckedCreateWithoutNotifikasisInput = {
    id?: bigint | number
    name: string
    username: string
    email: string
    emailVerifiedAt?: Date | string | null
    password: string
    role?: string
    spesialis?: string | null
    alamat?: string | null
    telepon?: string | null
    noHp?: string | null
    tanggalLahir?: Date | string | null
    jenisKelamin?: string | null
    nik?: string | null
    noRm?: string | null
    qrToken?: string | null
    qrPath?: string | null
    roleId?: bigint | number | null
    rememberToken?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    jadwalDokter?: JadwalDokterUncheckedCreateNestedManyWithoutDokterInput
    pendaftarans?: PendaftaranUncheckedCreateNestedManyWithoutUserInput
    pendaftarDokter?: PendaftaranUncheckedCreateNestedManyWithoutDokterInput
    pendaftarDiterima?: PendaftaranUncheckedCreateNestedManyWithoutDiterimaOlehDokterInput
    pembayarans?: PembayaranUncheckedCreateNestedManyWithoutUserInput
    rekamMedisDokter?: RekamMedisUncheckedCreateNestedManyWithoutDokterInput
    rekamMedisPasien?: RekamMedisUncheckedCreateNestedManyWithoutPasienInput
  }

  export type UserCreateOrConnectWithoutNotifikasisInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotifikasisInput, UserUncheckedCreateWithoutNotifikasisInput>
  }

  export type UserUpsertWithoutNotifikasisInput = {
    update: XOR<UserUpdateWithoutNotifikasisInput, UserUncheckedUpdateWithoutNotifikasisInput>
    create: XOR<UserCreateWithoutNotifikasisInput, UserUncheckedCreateWithoutNotifikasisInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotifikasisInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotifikasisInput, UserUncheckedUpdateWithoutNotifikasisInput>
  }

  export type UserUpdateWithoutNotifikasisInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUpdateManyWithoutDiterimaOlehDokterNestedInput
    pembayarans?: PembayaranUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUpdateManyWithoutPasienNestedInput
  }

  export type UserUncheckedUpdateWithoutNotifikasisInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    telepon?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jenisKelamin?: NullableStringFieldUpdateOperationsInput | string | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    noRm?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    rememberToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwalDokter?: JadwalDokterUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarans?: PendaftaranUncheckedUpdateManyWithoutUserNestedInput
    pendaftarDokter?: PendaftaranUncheckedUpdateManyWithoutDokterNestedInput
    pendaftarDiterima?: PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterNestedInput
    pembayarans?: PembayaranUncheckedUpdateManyWithoutUserNestedInput
    rekamMedisDokter?: RekamMedisUncheckedUpdateManyWithoutDokterNestedInput
    rekamMedisPasien?: RekamMedisUncheckedUpdateManyWithoutPasienNestedInput
  }

  export type JadwalDokterCreateManyDokterInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    hari: string
    jamMulai: Date | string
    jamSelesai: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PendaftaranCreateManyUserInput = {
    id?: bigint | number
    dokterId?: bigint | number | null
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PendaftaranCreateManyDokterInput = {
    id?: bigint | number
    userId: bigint | number
    diterimaOlehDokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PendaftaranCreateManyDiterimaOlehDokterInput = {
    id?: bigint | number
    userId: bigint | number
    dokterId?: bigint | number | null
    nama: string
    tanggalLahir: Date | string
    jenisKelamin: string
    noHp: string
    nik: string
    keluhan: string
    tanggalKunjungan?: Date | string | null
    jamKunjungan?: Date | string | null
    spesialis?: string | null
    status?: string
    nomorUrut?: number | null
    kodeAntrian?: string | null
    qrToken?: string | null
    qrPath?: string | null
    checkinAt?: Date | string | null
    checkedInAt?: Date | string | null
    checkedInBy?: bigint | number | null
    noShowAt?: Date | string | null
    noShowBy?: bigint | number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type NotifikasiCreateManyUserInput = {
    id?: bigint | number
    judul: string
    pesan: string
    tipe?: string | null
    link?: string | null
    dibaca?: boolean
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PembayaranCreateManyUserInput = {
    id?: bigint | number
    kodeTagihan: string
    jumlah: Decimal | DecimalJsLike | number | string
    status: string
    buktiPembayaran?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisCreateManyDokterInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    pasienId?: bigint | number | null
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisCreateManyPasienInput = {
    id?: bigint | number
    pendaftaranId: bigint | number
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type JadwalDokterUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JadwalDokterUncheckedUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JadwalDokterUncheckedUpdateManyWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    hari?: StringFieldUpdateOperationsInput | string
    jamMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    jamSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendaftaranUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dokter?: UserUpdateOneWithoutPendaftarDokterNestedInput
    diterimaOlehDokter?: UserUpdateOneWithoutPendaftarDiterimaNestedInput
    rekamMedis?: RekamMedisUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rekamMedis?: RekamMedisUncheckedUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendaftaranUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPendaftaransNestedInput
    diterimaOlehDokter?: UserUpdateOneWithoutPendaftarDiterimaNestedInput
    rekamMedis?: RekamMedisUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rekamMedis?: RekamMedisUncheckedUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateManyWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    diterimaOlehDokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendaftaranUpdateWithoutDiterimaOlehDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPendaftaransNestedInput
    dokter?: UserUpdateOneWithoutPendaftarDokterNestedInput
    rekamMedis?: RekamMedisUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateWithoutDiterimaOlehDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rekamMedis?: RekamMedisUncheckedUpdateManyWithoutPendaftaranNestedInput
  }

  export type PendaftaranUncheckedUpdateManyWithoutDiterimaOlehDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    nama?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    keluhan?: StringFieldUpdateOperationsInput | string
    tanggalKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jamKunjungan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    spesialis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    nomorUrut?: NullableIntFieldUpdateOperationsInput | number | null
    kodeAntrian?: NullableStringFieldUpdateOperationsInput | string | null
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrPath?: NullableStringFieldUpdateOperationsInput | string | null
    checkinAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedInBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    noShowAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    noShowBy?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotifikasiUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    judul?: StringFieldUpdateOperationsInput | string
    pesan?: StringFieldUpdateOperationsInput | string
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    dibaca?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PembayaranUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    kodeTagihan?: StringFieldUpdateOperationsInput | string
    jumlah?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    buktiPembayaran?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pasien?: UserUpdateOneWithoutRekamMedisPasienNestedInput
    pendaftaran?: PendaftaranUpdateOneRequiredWithoutRekamMedisNestedInput
  }

  export type RekamMedisUncheckedUpdateWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUncheckedUpdateManyWithoutDokterInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUpdateWithoutPasienInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dokter?: UserUpdateOneRequiredWithoutRekamMedisDokterNestedInput
    pendaftaran?: PendaftaranUpdateOneRequiredWithoutRekamMedisNestedInput
  }

  export type RekamMedisUncheckedUpdateWithoutPasienInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUncheckedUpdateManyWithoutPasienInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pendaftaranId?: BigIntFieldUpdateOperationsInput | bigint | number
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisCreateManyPendaftaranInput = {
    id?: bigint | number
    pasienId?: bigint | number | null
    dokterId: bigint | number
    tanggal?: Date | string | null
    diagnosa: string
    tindakan: string
    resep?: string | null
    catatan?: string | null
    chainIndex?: number | null
    prevHash?: string | null
    blockHash?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type RekamMedisUpdateWithoutPendaftaranInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dokter?: UserUpdateOneRequiredWithoutRekamMedisDokterNestedInput
    pasien?: UserUpdateOneWithoutRekamMedisPasienNestedInput
  }

  export type RekamMedisUncheckedUpdateWithoutPendaftaranInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RekamMedisUncheckedUpdateManyWithoutPendaftaranInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    pasienId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dokterId?: BigIntFieldUpdateOperationsInput | bigint | number
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    diagnosa?: StringFieldUpdateOperationsInput | string
    tindakan?: StringFieldUpdateOperationsInput | string
    resep?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    chainIndex?: NullableIntFieldUpdateOperationsInput | number | null
    prevHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}