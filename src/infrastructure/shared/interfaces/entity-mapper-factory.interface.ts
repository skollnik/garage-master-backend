export interface IEntityMapperFactory<TEntity, TModel> {
    fromEntity(entity: TEntity): TModel;
  }