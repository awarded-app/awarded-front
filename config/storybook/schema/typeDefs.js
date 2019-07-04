export default `
type Award implements Node {
  """Reads and enables pagination through a set of Category."""
  categories(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: CategoryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: CategoryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = [PRIMARY_KEY_ASC]
  ): CategoriesConnection!

  """Reads a single Country that is related to this Award."""
  country: Country
  countryId: Int!
  description: String

  """Reads and enables pagination through a set of Edition."""
  editions(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: EditionCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: EditionFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Edition."""
    orderBy: [EditionsOrderBy!] = [PRIMARY_KEY_ASC]
  ): EditionsConnection!
  id: Int!
  link: String!
  logo: String
  nameLong: String!
  nameShort: String!

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of Nomination."""
  nominations(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominationFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominationsConnection!

  """Reads and enables pagination through a set of Prize."""
  prizes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PrizeCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: PrizeFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = [NATURAL]
  ): PrizesConnection!
}

"""
A condition to be used against Award object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input AwardCondition {
  """Checks for equality with the object’s countryId field."""
  countryId: Int

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s link field."""
  link: String

  """Checks for equality with the object’s logo field."""
  logo: String

  """Checks for equality with the object’s nameLong field."""
  nameLong: String

  """Checks for equality with the object’s nameShort field."""
  nameShort: String
}

"""
A filter to be used against Award object types. All fields are combined with a logical ‘and.’
"""
input AwardFilter {
  """Checks for all expressions in this list."""
  and: [AwardFilter!]

  """Filter by the object’s countryId field."""
  countryId: IntFilter

  """Filter by the object’s description field."""
  description: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s link field."""
  link: StringFilter

  """Filter by the object’s logo field."""
  logo: StringFilter

  """Filter by the object’s nameLong field."""
  nameLong: StringFilter

  """Filter by the object’s nameShort field."""
  nameShort: StringFilter

  """Negates the expression."""
  not: AwardFilter

  """Checks for any expressions in this list."""
  or: [AwardFilter!]
}

"""An input for mutations affecting Award"""
input AwardInput {
  countryId: Int!
  description: String
  id: Int
  link: String!
  logo: String
  nameLong: String!
  nameShort: String!
}

"""
Represents an update to a Award. Fields that are set will be updated.
"""
input AwardPatch {
  countryId: Int
  description: String
  id: Int
  link: String
  logo: String
  nameLong: String
  nameShort: String
}

"""A connection to a list of Award values."""
type AwardsConnection {
  """
  A list of edges which contains the Award and cursor to aid in pagination.
  """
  edges: [AwardsEdge!]!

  """A list of Award objects."""
  nodes: [Award]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Award you could get from the connection."""
  totalCount: Int!
}

"""A Award edge in the connection."""
type AwardsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Award at the end of the edge."""
  node: Award
}

"""Methods to use when ordering Award."""
enum AwardsOrderBy {
  CATEGORIES_BY_AWARD_ID__COUNT_ASC
  CATEGORIES_BY_AWARD_ID__COUNT_DESC
  COUNTRY_BY_COUNTRY_ID__CODE_ASC
  COUNTRY_BY_COUNTRY_ID__CODE_DESC
  COUNTRY_BY_COUNTRY_ID__ID_ASC
  COUNTRY_BY_COUNTRY_ID__ID_DESC
  COUNTRY_BY_COUNTRY_ID__NAME_ASC
  COUNTRY_BY_COUNTRY_ID__NAME_DESC
  COUNTRY_ID_ASC
  COUNTRY_ID_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  EDITIONS_BY_AWARD_ID__COUNT_ASC
  EDITIONS_BY_AWARD_ID__COUNT_DESC
  ID_ASC
  ID_DESC
  LINK_ASC
  LINK_DESC
  LOGO_ASC
  LOGO_DESC
  NAME_LONG_ASC
  NAME_LONG_DESC
  NAME_SHORT_ASC
  NAME_SHORT_DESC
  NATURAL
  NOMINATIONS_BY_AWARD_ID__COUNT_ASC
  NOMINATIONS_BY_AWARD_ID__COUNT_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  PRIZES_BY_AWARD_ID__COUNT_ASC
  PRIZES_BY_AWARD_ID__COUNT_DESC
}

"""
A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’
"""
input BooleanFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Boolean

  """Equal to the specified value."""
  equalTo: Boolean

  """Greater than the specified value."""
  greaterThan: Boolean

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Boolean

  """Included in the specified list."""
  in: [Boolean!]

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: Boolean

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Boolean

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Boolean

  """Not equal to the specified value."""
  notEqualTo: Boolean

  """Not included in the specified list."""
  notIn: [Boolean!]
}

"""A connection to a list of Category values."""
type CategoriesConnection {
  """
  A list of edges which contains the Category and cursor to aid in pagination.
  """
  edges: [CategoriesEdge!]!

  """A list of Category objects."""
  nodes: [Category]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Category you could get from the connection."""
  totalCount: Int!
}

"""A Category edge in the connection."""
type CategoriesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Category at the end of the edge."""
  node: Category
}

"""Methods to use when ordering Category."""
enum CategoriesOrderBy {
  AWARD_BY_AWARD_ID__COUNTRY_ID_ASC
  AWARD_BY_AWARD_ID__COUNTRY_ID_DESC
  AWARD_BY_AWARD_ID__DESCRIPTION_ASC
  AWARD_BY_AWARD_ID__DESCRIPTION_DESC
  AWARD_BY_AWARD_ID__ID_ASC
  AWARD_BY_AWARD_ID__ID_DESC
  AWARD_BY_AWARD_ID__LINK_ASC
  AWARD_BY_AWARD_ID__LINK_DESC
  AWARD_BY_AWARD_ID__LOGO_ASC
  AWARD_BY_AWARD_ID__LOGO_DESC
  AWARD_BY_AWARD_ID__NAME_LONG_ASC
  AWARD_BY_AWARD_ID__NAME_LONG_DESC
  AWARD_BY_AWARD_ID__NAME_SHORT_ASC
  AWARD_BY_AWARD_ID__NAME_SHORT_DESC
  AWARD_ID_ASC
  AWARD_ID_DESC
  CATEGORIES_BY_AWARD_ID_AND_PARENT_ID__COUNT_ASC
  CATEGORIES_BY_AWARD_ID_AND_PARENT_ID__COUNT_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__AWARD_ID_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__AWARD_ID_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__CREDIT_SEARCH_KEYWORDS_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__CREDIT_SEARCH_KEYWORDS_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__DESCRIPTION_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__DESCRIPTION_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__DISPLAY_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__DISPLAY_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__ID_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__ID_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__IMPORTANT_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__IMPORTANT_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__NAME_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__NAME_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__ORDER_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__ORDER_DESC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__PARENT_ID_ASC
  CATEGORY_BY_AWARD_ID_AND_PARENT_ID__PARENT_ID_DESC
  CREDIT_SEARCH_KEYWORDS_ASC
  CREDIT_SEARCH_KEYWORDS_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  DISPLAY_ASC
  DISPLAY_DESC
  EDITION_ADMIN_NOTES_BY_CATEGORY_ID__COUNT_ASC
  EDITION_ADMIN_NOTES_BY_CATEGORY_ID__COUNT_DESC
  ID_ASC
  ID_DESC
  IMPORTANT_ASC
  IMPORTANT_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  NOMINATIONS_BY_CATEGORY_ID__COUNT_ASC
  NOMINATIONS_BY_CATEGORY_ID__COUNT_DESC
  ORDER_ASC
  ORDER_DESC
  PARENT_ID_ASC
  PARENT_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  PRIZES_BY_CATEGORY_ID__COUNT_ASC
  PRIZES_BY_CATEGORY_ID__COUNT_DESC
}

type Category implements Node {
  """Reads a single Award that is related to this Category."""
  award: Award
  awardId: Int!

  """Reads and enables pagination through a set of Category."""
  categoriesByAwardIdAndParentId(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: CategoryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: CategoryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = [PRIMARY_KEY_ASC]
  ): CategoriesConnection!

  """Reads a single Category that is related to this Category."""
  categoryByAwardIdAndParentId: Category
  creditSearchKeywords: String
  description: String
  display: String

  """Reads and enables pagination through a set of EditionAdminNote."""
  editionAdminNotes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: EditionAdminNoteCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: EditionAdminNoteFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = [PRIMARY_KEY_ASC]
  ): EditionAdminNotesConnection!
  id: Int!
  important: Boolean
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of Nomination."""
  nominations(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominationFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominationsConnection!
  order: Int
  parentId: Int

  """Reads and enables pagination through a set of Prize."""
  prizes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PrizeCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: PrizeFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = [NATURAL]
  ): PrizesConnection!
}

"""
A condition to be used against Category object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input CategoryCondition {
  """Checks for equality with the object’s awardId field."""
  awardId: Int

  """Checks for equality with the object’s creditSearchKeywords field."""
  creditSearchKeywords: String

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s display field."""
  display: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s important field."""
  important: Boolean

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s order field."""
  order: Int

  """Checks for equality with the object’s parentId field."""
  parentId: Int
}

"""
A filter to be used against Category object types. All fields are combined with a logical ‘and.’
"""
input CategoryFilter {
  """Checks for all expressions in this list."""
  and: [CategoryFilter!]

  """Filter by the object’s awardId field."""
  awardId: IntFilter

  """Filter by the object’s creditSearchKeywords field."""
  creditSearchKeywords: StringFilter

  """Filter by the object’s description field."""
  description: StringFilter

  """Filter by the object’s display field."""
  display: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s important field."""
  important: BooleanFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: CategoryFilter

  """Checks for any expressions in this list."""
  or: [CategoryFilter!]

  """Filter by the object’s order field."""
  order: IntFilter

  """Filter by the object’s parentId field."""
  parentId: IntFilter
}

"""An input for mutations affecting Category"""
input CategoryInput {
  awardId: Int!
  creditSearchKeywords: String
  description: String
  display: String
  id: Int!
  important: Boolean
  name: String
  order: Int
  parentId: Int
}

"""
Represents an update to a Category. Fields that are set will be updated.
"""
input CategoryPatch {
  awardId: Int
  creditSearchKeywords: String
  description: String
  display: String
  id: Int
  important: Boolean
  name: String
  order: Int
  parentId: Int
}

"""A connection to a list of Country values."""
type CountriesConnection {
  """
  A list of edges which contains the Country and cursor to aid in pagination.
  """
  edges: [CountriesEdge!]!

  """A list of Country objects."""
  nodes: [Country]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Country you could get from the connection."""
  totalCount: Int!
}

"""A Country edge in the connection."""
type CountriesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Country at the end of the edge."""
  node: Country
}

"""Methods to use when ordering Country."""
enum CountriesOrderBy {
  AWARDS_BY_COUNTRY_ID__COUNT_ASC
  AWARDS_BY_COUNTRY_ID__COUNT_DESC
  CODE_ASC
  CODE_DESC
  ID_ASC
  ID_DESC
  MOVIE_COUNTRIES_BY_COUNTRY_ID__COUNT_ASC
  MOVIE_COUNTRIES_BY_COUNTRY_ID__COUNT_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

type Country implements Node {
  """Reads and enables pagination through a set of Award."""
  awards(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: AwardCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: AwardFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Award."""
    orderBy: [AwardsOrderBy!] = [PRIMARY_KEY_ASC]
  ): AwardsConnection!
  code: String
  id: Int!

  """Reads and enables pagination through a set of MovieCountry."""
  movieCountries(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieCountryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieCountryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieCountry."""
    orderBy: [MovieCountriesOrderBy!] = [NATURAL]
  ): MovieCountriesConnection!
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""
A condition to be used against Country object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input CountryCondition {
  """Checks for equality with the object’s code field."""
  code: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String
}

"""
A filter to be used against Country object types. All fields are combined with a logical ‘and.’
"""
input CountryFilter {
  """Checks for all expressions in this list."""
  and: [CountryFilter!]

  """Filter by the object’s code field."""
  code: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: CountryFilter

  """Checks for any expressions in this list."""
  or: [CountryFilter!]
}

"""An input for mutations affecting Country"""
input CountryInput {
  code: String
  id: Int
  name: String
}

"""
Represents an update to a Country. Fields that are set will be updated.
"""
input CountryPatch {
  code: String
  id: Int
  name: String
}

"""All input for the create Award mutation."""
input CreateAwardInput {
  """The Award to be created by this mutation."""
  award: AwardInput!

  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
}

"""The output of our create Award mutation."""
type CreateAwardPayload {
  """The Award that was created by this mutation."""
  award: Award

  """An edge for our Award. May be used by Relay 1."""
  awardEdge(
    """The method to use when ordering Award."""
    orderBy: [AwardsOrderBy!] = PRIMARY_KEY_ASC
  ): AwardsEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Country that is related to this Award."""
  country: Country

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Category mutation."""
input CreateCategoryInput {
  """The Category to be created by this mutation."""
  category: CategoryInput!

  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
}

"""The output of our create Category mutation."""
type CreateCategoryPayload {
  """Reads a single Award that is related to this Category."""
  award: Award

  """The Category that was created by this mutation."""
  category: Category

  """Reads a single Category that is related to this Category."""
  categoryByAwardIdAndParentId: Category

  """An edge for our Category. May be used by Relay 1."""
  categoryEdge(
    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = PRIMARY_KEY_ASC
  ): CategoriesEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Country mutation."""
input CreateCountryInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Country to be created by this mutation."""
  country: CountryInput!
}

"""The output of our create Country mutation."""
type CreateCountryPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Country that was created by this mutation."""
  country: Country

  """An edge for our Country. May be used by Relay 1."""
  countryEdge(
    """The method to use when ordering Country."""
    orderBy: [CountriesOrderBy!] = PRIMARY_KEY_ASC
  ): CountriesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Department mutation."""
input CreateDepartmentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Department to be created by this mutation."""
  department: DepartmentInput!
}

"""The output of our create Department mutation."""
type CreateDepartmentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Department that was created by this mutation."""
  department: Department

  """An edge for our Department. May be used by Relay 1."""
  departmentEdge(
    """The method to use when ordering Department."""
    orderBy: [DepartmentsOrderBy!] = PRIMARY_KEY_ASC
  ): DepartmentsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create EditionAdminNote mutation."""
input CreateEditionAdminNoteInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The EditionAdminNote to be created by this mutation."""
  editionAdminNote: EditionAdminNoteInput!
}

"""The output of our create EditionAdminNote mutation."""
type CreateEditionAdminNotePayload {
  """Reads a single Category that is related to this EditionAdminNote."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Edition that is related to this EditionAdminNote."""
  edition: Edition

  """The EditionAdminNote that was created by this mutation."""
  editionAdminNote: EditionAdminNote

  """An edge for our EditionAdminNote. May be used by Relay 1."""
  editionAdminNoteEdge(
    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = PRIMARY_KEY_ASC
  ): EditionAdminNotesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Edition mutation."""
input CreateEditionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Edition to be created by this mutation."""
  edition: EditionInput!
}

"""The output of our create Edition mutation."""
type CreateEditionPayload {
  """Reads a single Award that is related to this Edition."""
  award: Award

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Edition that was created by this mutation."""
  edition: Edition

  """An edge for our Edition. May be used by Relay 1."""
  editionEdge(
    """The method to use when ordering Edition."""
    orderBy: [EditionsOrderBy!] = PRIMARY_KEY_ASC
  ): EditionsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Genre mutation."""
input CreateGenreInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Genre to be created by this mutation."""
  genre: GenreInput!
}

"""The output of our create Genre mutation."""
type CreateGenrePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Genre that was created by this mutation."""
  genre: Genre

  """An edge for our Genre. May be used by Relay 1."""
  genreEdge(
    """The method to use when ordering Genre."""
    orderBy: [GenresOrderBy!] = PRIMARY_KEY_ASC
  ): GenresEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Job mutation."""
input CreateJobInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Job to be created by this mutation."""
  job: JobInput!
}

"""The output of our create Job mutation."""
type CreateJobPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Department that is related to this Job."""
  department: Department

  """The Job that was created by this mutation."""
  job: Job

  """An edge for our Job. May be used by Relay 1."""
  jobEdge(
    """The method to use when ordering Job."""
    orderBy: [JobsOrderBy!] = PRIMARY_KEY_ASC
  ): JobsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create MovieBackdrop mutation."""
input CreateMovieBackdropInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The MovieBackdrop to be created by this mutation."""
  movieBackdrop: MovieBackdropInput!
}

"""The output of our create MovieBackdrop mutation."""
type CreateMovieBackdropPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Movie that is related to this MovieBackdrop."""
  movie: Movie

  """The MovieBackdrop that was created by this mutation."""
  movieBackdrop: MovieBackdrop

  """An edge for our MovieBackdrop. May be used by Relay 1."""
  movieBackdropEdge(
    """The method to use when ordering MovieBackdrop."""
    orderBy: [MovieBackdropsOrderBy!] = PRIMARY_KEY_ASC
  ): MovieBackdropsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create MovieCountry mutation."""
input CreateMovieCountryInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The MovieCountry to be created by this mutation."""
  movieCountry: MovieCountryInput!
}

"""The output of our create MovieCountry mutation."""
type CreateMovieCountryPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Country that is related to this MovieCountry."""
  country: Country

  """Reads a single Movie that is related to this MovieCountry."""
  movie: Movie

  """The MovieCountry that was created by this mutation."""
  movieCountry: MovieCountry

  """An edge for our MovieCountry. May be used by Relay 1."""
  movieCountryEdge(
    """The method to use when ordering MovieCountry."""
    orderBy: [MovieCountriesOrderBy!] = NATURAL
  ): MovieCountriesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create MovieGenre mutation."""
input CreateMovieGenreInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The MovieGenre to be created by this mutation."""
  movieGenre: MovieGenreInput!
}

"""The output of our create MovieGenre mutation."""
type CreateMovieGenrePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Genre that is related to this MovieGenre."""
  genre: Genre

  """Reads a single Movie that is related to this MovieGenre."""
  movie: Movie

  """The MovieGenre that was created by this mutation."""
  movieGenre: MovieGenre

  """An edge for our MovieGenre. May be used by Relay 1."""
  movieGenreEdge(
    """The method to use when ordering MovieGenre."""
    orderBy: [MovieGenresOrderBy!] = NATURAL
  ): MovieGenresEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Movie mutation."""
input CreateMovieInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Movie to be created by this mutation."""
  movie: MovieInput!
}

"""The output of our create Movie mutation."""
type CreateMoviePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Movie that was created by this mutation."""
  movie: Movie

  """An edge for our Movie. May be used by Relay 1."""
  movieEdge(
    """The method to use when ordering Movie."""
    orderBy: [MoviesOrderBy!] = PRIMARY_KEY_ASC
  ): MoviesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create MoviePoster mutation."""
input CreateMoviePosterInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The MoviePoster to be created by this mutation."""
  moviePoster: MoviePosterInput!
}

"""The output of our create MoviePoster mutation."""
type CreateMoviePosterPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Movie that is related to this MoviePoster."""
  movie: Movie

  """The MoviePoster that was created by this mutation."""
  moviePoster: MoviePoster

  """An edge for our MoviePoster. May be used by Relay 1."""
  moviePosterEdge(
    """The method to use when ordering MoviePoster."""
    orderBy: [MoviePostersOrderBy!] = PRIMARY_KEY_ASC
  ): MoviePostersEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create NominatedPerson mutation."""
input CreateNominatedPersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The NominatedPerson to be created by this mutation."""
  nominatedPerson: NominatedPersonInput!
}

"""The output of our create NominatedPerson mutation."""
type CreateNominatedPersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Job that is related to this NominatedPerson."""
  job: Job

  """The NominatedPerson that was created by this mutation."""
  nominatedPerson: NominatedPerson

  """An edge for our NominatedPerson. May be used by Relay 1."""
  nominatedPersonEdge(
    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = PRIMARY_KEY_ASC
  ): NominatedPeopleEdge

  """Reads a single Nomination that is related to this NominatedPerson."""
  nomination: Nomination

  """Reads a single Person that is related to this NominatedPerson."""
  person: Person

  """Reads a single Prize that is related to this NominatedPerson."""
  prize: Prize

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Nomination mutation."""
input CreateNominationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Nomination to be created by this mutation."""
  nomination: NominationInput!
}

"""The output of our create Nomination mutation."""
type CreateNominationPayload {
  """Reads a single Award that is related to this Nomination."""
  award: Award

  """Reads a single Category that is related to this Nomination."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Edition that is related to this Nomination."""
  edition: Edition

  """Reads a single Movie that is related to this Nomination."""
  movie: Movie

  """The Nomination that was created by this mutation."""
  nomination: Nomination

  """An edge for our Nomination. May be used by Relay 1."""
  nominationEdge(
    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = PRIMARY_KEY_ASC
  ): NominationsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Person mutation."""
input CreatePersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Person to be created by this mutation."""
  person: PersonInput!
}

"""The output of our create Person mutation."""
type CreatePersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Person that was created by this mutation."""
  person: Person

  """An edge for our Person. May be used by Relay 1."""
  personEdge(
    """The method to use when ordering Person."""
    orderBy: [PeopleOrderBy!] = PRIMARY_KEY_ASC
  ): PeopleEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create Prize mutation."""
input CreatePrizeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Prize to be created by this mutation."""
  prize: PrizeInput!
}

"""The output of our create Prize mutation."""
type CreatePrizePayload {
  """Reads a single Award that is related to this Prize."""
  award: Award

  """Reads a single Category that is related to this Prize."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Prize that was created by this mutation."""
  prize: Prize

  """An edge for our Prize. May be used by Relay 1."""
  prizeEdge(
    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = NATURAL
  ): PrizesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the create User mutation."""
input CreateUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The User to be created by this mutation."""
  user: UserInput!
}

"""The output of our create User mutation."""
type CreateUserPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """The User that was created by this mutation."""
  user: User

  """An edge for our User. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering User."""
    orderBy: [UsersOrderBy!] = PRIMARY_KEY_ASC
  ): UsersEdge
}

"""A location in a connection that can be used for resuming pagination."""
scalar Cursor

"""The day, does not include a time."""
scalar Date

"""
A filter to be used against Date fields. All fields are combined with a logical ‘and.’
"""
input DateFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Date

  """Equal to the specified value."""
  equalTo: Date

  """Greater than the specified value."""
  greaterThan: Date

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Date

  """Included in the specified list."""
  in: [Date!]

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: Date

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Date

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Date

  """Not equal to the specified value."""
  notEqualTo: Date

  """Not included in the specified list."""
  notIn: [Date!]
}

"""
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
"""
scalar Datetime

"""
A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’
"""
input DatetimeFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Datetime

  """Equal to the specified value."""
  equalTo: Datetime

  """Greater than the specified value."""
  greaterThan: Datetime

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Datetime

  """Included in the specified list."""
  in: [Datetime!]

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: Datetime

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Datetime

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Datetime

  """Not equal to the specified value."""
  notEqualTo: Datetime

  """Not included in the specified list."""
  notIn: [Datetime!]
}

"""All input for the deleteAwardByLink mutation."""
input DeleteAwardByLinkInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  link: String!
}

"""All input for the deleteAwardByNameShort mutation."""
input DeleteAwardByNameShortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  nameShort: String!
}

"""All input for the deleteAwardByNodeId mutation."""
input DeleteAwardByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Award to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteAward mutation."""
input DeleteAwardInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Award mutation."""
type DeleteAwardPayload {
  """The Award that was deleted by this mutation."""
  award: Award

  """An edge for our Award. May be used by Relay 1."""
  awardEdge(
    """The method to use when ordering Award."""
    orderBy: [AwardsOrderBy!] = PRIMARY_KEY_ASC
  ): AwardsEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Country that is related to this Award."""
  country: Country
  deletedAwardNodeId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteCategoryById mutation."""
input DeleteCategoryByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""All input for the deleteCategoryByNodeId mutation."""
input DeleteCategoryByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Category to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteCategory mutation."""
input DeleteCategoryInput {
  awardId: Int!

  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Category mutation."""
type DeleteCategoryPayload {
  """Reads a single Award that is related to this Category."""
  award: Award

  """The Category that was deleted by this mutation."""
  category: Category

  """Reads a single Category that is related to this Category."""
  categoryByAwardIdAndParentId: Category

  """An edge for our Category. May be used by Relay 1."""
  categoryEdge(
    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = PRIMARY_KEY_ASC
  ): CategoriesEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedCategoryNodeId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteCountryByCode mutation."""
input DeleteCountryByCodeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  code: String!
}

"""All input for the deleteCountryByNodeId mutation."""
input DeleteCountryByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Country to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteCountry mutation."""
input DeleteCountryInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Country mutation."""
type DeleteCountryPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Country that was deleted by this mutation."""
  country: Country

  """An edge for our Country. May be used by Relay 1."""
  countryEdge(
    """The method to use when ordering Country."""
    orderBy: [CountriesOrderBy!] = PRIMARY_KEY_ASC
  ): CountriesEdge
  deletedCountryNodeId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteDepartmentByNodeId mutation."""
input DeleteDepartmentByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Department to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteDepartment mutation."""
input DeleteDepartmentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Department mutation."""
type DeleteDepartmentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedDepartmentNodeId: ID

  """The Department that was deleted by this mutation."""
  department: Department

  """An edge for our Department. May be used by Relay 1."""
  departmentEdge(
    """The method to use when ordering Department."""
    orderBy: [DepartmentsOrderBy!] = PRIMARY_KEY_ASC
  ): DepartmentsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteEditionAdminNoteByNodeId mutation."""
input DeleteEditionAdminNoteByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single EditionAdminNote to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteEditionAdminNote mutation."""
input DeleteEditionAdminNoteInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete EditionAdminNote mutation."""
type DeleteEditionAdminNotePayload {
  """Reads a single Category that is related to this EditionAdminNote."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedEditionAdminNoteNodeId: ID

  """Reads a single Edition that is related to this EditionAdminNote."""
  edition: Edition

  """The EditionAdminNote that was deleted by this mutation."""
  editionAdminNote: EditionAdminNote

  """An edge for our EditionAdminNote. May be used by Relay 1."""
  editionAdminNoteEdge(
    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = PRIMARY_KEY_ASC
  ): EditionAdminNotesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteEditionByNodeId mutation."""
input DeleteEditionByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Edition to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteEdition mutation."""
input DeleteEditionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Edition mutation."""
type DeleteEditionPayload {
  """Reads a single Award that is related to this Edition."""
  award: Award

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedEditionNodeId: ID

  """The Edition that was deleted by this mutation."""
  edition: Edition

  """An edge for our Edition. May be used by Relay 1."""
  editionEdge(
    """The method to use when ordering Edition."""
    orderBy: [EditionsOrderBy!] = PRIMARY_KEY_ASC
  ): EditionsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteGenreByNodeId mutation."""
input DeleteGenreByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Genre to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteGenre mutation."""
input DeleteGenreInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Genre mutation."""
type DeleteGenrePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedGenreNodeId: ID

  """The Genre that was deleted by this mutation."""
  genre: Genre

  """An edge for our Genre. May be used by Relay 1."""
  genreEdge(
    """The method to use when ordering Genre."""
    orderBy: [GenresOrderBy!] = PRIMARY_KEY_ASC
  ): GenresEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteJobByNodeId mutation."""
input DeleteJobByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Job to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteJob mutation."""
input DeleteJobInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Job mutation."""
type DeleteJobPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedJobNodeId: ID

  """Reads a single Department that is related to this Job."""
  department: Department

  """The Job that was deleted by this mutation."""
  job: Job

  """An edge for our Job. May be used by Relay 1."""
  jobEdge(
    """The method to use when ordering Job."""
    orderBy: [JobsOrderBy!] = PRIMARY_KEY_ASC
  ): JobsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteMovieBackdropByNodeId mutation."""
input DeleteMovieBackdropByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single MovieBackdrop to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteMovieBackdrop mutation."""
input DeleteMovieBackdropInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete MovieBackdrop mutation."""
type DeleteMovieBackdropPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedMovieBackdropNodeId: ID

  """Reads a single Movie that is related to this MovieBackdrop."""
  movie: Movie

  """The MovieBackdrop that was deleted by this mutation."""
  movieBackdrop: MovieBackdrop

  """An edge for our MovieBackdrop. May be used by Relay 1."""
  movieBackdropEdge(
    """The method to use when ordering MovieBackdrop."""
    orderBy: [MovieBackdropsOrderBy!] = PRIMARY_KEY_ASC
  ): MovieBackdropsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteMovieByNodeId mutation."""
input DeleteMovieByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Movie to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteMovie mutation."""
input DeleteMovieInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Movie mutation."""
type DeleteMoviePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedMovieNodeId: ID

  """The Movie that was deleted by this mutation."""
  movie: Movie

  """An edge for our Movie. May be used by Relay 1."""
  movieEdge(
    """The method to use when ordering Movie."""
    orderBy: [MoviesOrderBy!] = PRIMARY_KEY_ASC
  ): MoviesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteMoviePosterByNodeId mutation."""
input DeleteMoviePosterByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single MoviePoster to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteMoviePoster mutation."""
input DeleteMoviePosterInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete MoviePoster mutation."""
type DeleteMoviePosterPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedMoviePosterNodeId: ID

  """Reads a single Movie that is related to this MoviePoster."""
  movie: Movie

  """The MoviePoster that was deleted by this mutation."""
  moviePoster: MoviePoster

  """An edge for our MoviePoster. May be used by Relay 1."""
  moviePosterEdge(
    """The method to use when ordering MoviePoster."""
    orderBy: [MoviePostersOrderBy!] = PRIMARY_KEY_ASC
  ): MoviePostersEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteNominatedPersonByNodeId mutation."""
input DeleteNominatedPersonByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single NominatedPerson to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteNominatedPerson mutation."""
input DeleteNominatedPersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete NominatedPerson mutation."""
type DeleteNominatedPersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedNominatedPersonNodeId: ID

  """Reads a single Job that is related to this NominatedPerson."""
  job: Job

  """The NominatedPerson that was deleted by this mutation."""
  nominatedPerson: NominatedPerson

  """An edge for our NominatedPerson. May be used by Relay 1."""
  nominatedPersonEdge(
    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = PRIMARY_KEY_ASC
  ): NominatedPeopleEdge

  """Reads a single Nomination that is related to this NominatedPerson."""
  nomination: Nomination

  """Reads a single Person that is related to this NominatedPerson."""
  person: Person

  """Reads a single Prize that is related to this NominatedPerson."""
  prize: Prize

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteNominationByNodeId mutation."""
input DeleteNominationByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Nomination to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteNomination mutation."""
input DeleteNominationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Nomination mutation."""
type DeleteNominationPayload {
  """Reads a single Award that is related to this Nomination."""
  award: Award

  """Reads a single Category that is related to this Nomination."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedNominationNodeId: ID

  """Reads a single Edition that is related to this Nomination."""
  edition: Edition

  """Reads a single Movie that is related to this Nomination."""
  movie: Movie

  """The Nomination that was deleted by this mutation."""
  nomination: Nomination

  """An edge for our Nomination. May be used by Relay 1."""
  nominationEdge(
    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = PRIMARY_KEY_ASC
  ): NominationsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deletePersonByNodeId mutation."""
input DeletePersonByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Person to be deleted.
  """
  nodeId: ID!
}

"""All input for the deletePerson mutation."""
input DeletePersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Person mutation."""
type DeletePersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedPersonNodeId: ID

  """The Person that was deleted by this mutation."""
  person: Person

  """An edge for our Person. May be used by Relay 1."""
  personEdge(
    """The method to use when ordering Person."""
    orderBy: [PeopleOrderBy!] = PRIMARY_KEY_ASC
  ): PeopleEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deletePrizeById mutation."""
input DeletePrizeByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Prize mutation."""
type DeletePrizePayload {
  """Reads a single Award that is related to this Prize."""
  award: Award

  """Reads a single Category that is related to this Prize."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedPrizeNodeId: ID

  """The Prize that was deleted by this mutation."""
  prize: Prize

  """An edge for our Prize. May be used by Relay 1."""
  prizeEdge(
    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = NATURAL
  ): PrizesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the deleteUserByEmail mutation."""
input DeleteUserByEmailInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  email: String!
}

"""All input for the deleteUserByNodeId mutation."""
input DeleteUserByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single User to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteUser mutation."""
input DeleteUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete User mutation."""
type DeleteUserPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String
  deletedUserNodeId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """The User that was deleted by this mutation."""
  user: User

  """An edge for our User. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering User."""
    orderBy: [UsersOrderBy!] = PRIMARY_KEY_ASC
  ): UsersEdge
}

type Department implements Node {
  id: Int!

  """Reads and enables pagination through a set of Job."""
  jobs(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: JobCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: JobFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Job."""
    orderBy: [JobsOrderBy!] = [PRIMARY_KEY_ASC]
  ): JobsConnection!
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""
A condition to be used against Department object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input DepartmentCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String
}

"""
A filter to be used against Department object types. All fields are combined with a logical ‘and.’
"""
input DepartmentFilter {
  """Checks for all expressions in this list."""
  and: [DepartmentFilter!]

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: DepartmentFilter

  """Checks for any expressions in this list."""
  or: [DepartmentFilter!]
}

"""An input for mutations affecting Department"""
input DepartmentInput {
  id: Int
  name: String
}

"""
Represents an update to a Department. Fields that are set will be updated.
"""
input DepartmentPatch {
  id: Int
  name: String
}

"""A connection to a list of Department values."""
type DepartmentsConnection {
  """
  A list of edges which contains the Department and cursor to aid in pagination.
  """
  edges: [DepartmentsEdge!]!

  """A list of Department objects."""
  nodes: [Department]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Department you could get from the connection."""
  totalCount: Int!
}

"""A Department edge in the connection."""
type DepartmentsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Department at the end of the edge."""
  node: Department
}

"""Methods to use when ordering Department."""
enum DepartmentsOrderBy {
  ID_ASC
  ID_DESC
  JOBS_BY_DEPARTMENT_ID__COUNT_ASC
  JOBS_BY_DEPARTMENT_ID__COUNT_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

type Edition implements Node {
  """Reads a single Award that is related to this Edition."""
  award: Award
  awardId: Int
  date: Date

  """Reads and enables pagination through a set of EditionAdminNote."""
  editionAdminNotes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: EditionAdminNoteCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: EditionAdminNoteFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = [PRIMARY_KEY_ASC]
  ): EditionAdminNotesConnection!
  flag: String
  id: Int!
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of Nomination."""
  nominations(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominationFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominationsConnection!
  poster: String
  publish: Boolean
  wikipedia: String
}

type EditionAdminNote implements Node {
  """Reads a single Category that is related to this EditionAdminNote."""
  category: Category
  categoryId: Int

  """Reads a single Edition that is related to this EditionAdminNote."""
  edition: Edition
  editionId: Int
  flag: String
  id: Int!

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""
A condition to be used against EditionAdminNote object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input EditionAdminNoteCondition {
  """Checks for equality with the object’s categoryId field."""
  categoryId: Int

  """Checks for equality with the object’s editionId field."""
  editionId: Int

  """Checks for equality with the object’s flag field."""
  flag: String

  """Checks for equality with the object’s id field."""
  id: Int
}

"""
A filter to be used against EditionAdminNote object types. All fields are combined with a logical ‘and.’
"""
input EditionAdminNoteFilter {
  """Checks for all expressions in this list."""
  and: [EditionAdminNoteFilter!]

  """Filter by the object’s categoryId field."""
  categoryId: IntFilter

  """Filter by the object’s editionId field."""
  editionId: IntFilter

  """Filter by the object’s flag field."""
  flag: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Negates the expression."""
  not: EditionAdminNoteFilter

  """Checks for any expressions in this list."""
  or: [EditionAdminNoteFilter!]
}

"""An input for mutations affecting EditionAdminNote"""
input EditionAdminNoteInput {
  categoryId: Int
  editionId: Int
  flag: String
  id: Int
}

"""
Represents an update to a EditionAdminNote. Fields that are set will be updated.
"""
input EditionAdminNotePatch {
  categoryId: Int
  editionId: Int
  flag: String
  id: Int
}

"""A connection to a list of EditionAdminNote values."""
type EditionAdminNotesConnection {
  """
  A list of edges which contains the EditionAdminNote and cursor to aid in pagination.
  """
  edges: [EditionAdminNotesEdge!]!

  """A list of EditionAdminNote objects."""
  nodes: [EditionAdminNote]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """
  The count of *all* EditionAdminNote you could get from the connection.
  """
  totalCount: Int!
}

"""A EditionAdminNote edge in the connection."""
type EditionAdminNotesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The EditionAdminNote at the end of the edge."""
  node: EditionAdminNote
}

"""Methods to use when ordering EditionAdminNote."""
enum EditionAdminNotesOrderBy {
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_ASC
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_DESC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_ASC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_DESC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_ASC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_DESC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_ASC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_DESC
  CATEGORY_BY_CATEGORY_ID__ID_ASC
  CATEGORY_BY_CATEGORY_ID__ID_DESC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_ASC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_DESC
  CATEGORY_BY_CATEGORY_ID__NAME_ASC
  CATEGORY_BY_CATEGORY_ID__NAME_DESC
  CATEGORY_BY_CATEGORY_ID__ORDER_ASC
  CATEGORY_BY_CATEGORY_ID__ORDER_DESC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_ASC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_DESC
  CATEGORY_ID_ASC
  CATEGORY_ID_DESC
  EDITION_BY_EDITION_ID__AWARD_ID_ASC
  EDITION_BY_EDITION_ID__AWARD_ID_DESC
  EDITION_BY_EDITION_ID__DATE_ASC
  EDITION_BY_EDITION_ID__DATE_DESC
  EDITION_BY_EDITION_ID__FLAG_ASC
  EDITION_BY_EDITION_ID__FLAG_DESC
  EDITION_BY_EDITION_ID__ID_ASC
  EDITION_BY_EDITION_ID__ID_DESC
  EDITION_BY_EDITION_ID__NAME_ASC
  EDITION_BY_EDITION_ID__NAME_DESC
  EDITION_BY_EDITION_ID__POSTER_ASC
  EDITION_BY_EDITION_ID__POSTER_DESC
  EDITION_BY_EDITION_ID__PUBLISH_ASC
  EDITION_BY_EDITION_ID__PUBLISH_DESC
  EDITION_BY_EDITION_ID__WIKIPEDIA_ASC
  EDITION_BY_EDITION_ID__WIKIPEDIA_DESC
  EDITION_ID_ASC
  EDITION_ID_DESC
  FLAG_ASC
  FLAG_DESC
  ID_ASC
  ID_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Edition object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input EditionCondition {
  """Checks for equality with the object’s awardId field."""
  awardId: Int

  """Checks for equality with the object’s date field."""
  date: Date

  """Checks for equality with the object’s flag field."""
  flag: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s poster field."""
  poster: String

  """Checks for equality with the object’s publish field."""
  publish: Boolean

  """Checks for equality with the object’s wikipedia field."""
  wikipedia: String
}

"""
A filter to be used against Edition object types. All fields are combined with a logical ‘and.’
"""
input EditionFilter {
  """Checks for all expressions in this list."""
  and: [EditionFilter!]

  """Filter by the object’s awardId field."""
  awardId: IntFilter

  """Filter by the object’s date field."""
  date: DateFilter

  """Filter by the object’s flag field."""
  flag: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: EditionFilter

  """Checks for any expressions in this list."""
  or: [EditionFilter!]

  """Filter by the object’s poster field."""
  poster: StringFilter

  """Filter by the object’s publish field."""
  publish: BooleanFilter

  """Filter by the object’s wikipedia field."""
  wikipedia: StringFilter
}

"""An input for mutations affecting Edition"""
input EditionInput {
  awardId: Int
  date: Date
  flag: String
  id: Int
  name: String
  poster: String
  publish: Boolean
  wikipedia: String
}

"""
Represents an update to a Edition. Fields that are set will be updated.
"""
input EditionPatch {
  awardId: Int
  date: Date
  flag: String
  id: Int
  name: String
  poster: String
  publish: Boolean
  wikipedia: String
}

"""A connection to a list of Edition values."""
type EditionsConnection {
  """
  A list of edges which contains the Edition and cursor to aid in pagination.
  """
  edges: [EditionsEdge!]!

  """A list of Edition objects."""
  nodes: [Edition]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Edition you could get from the connection."""
  totalCount: Int!
}

"""A Edition edge in the connection."""
type EditionsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Edition at the end of the edge."""
  node: Edition
}

"""Methods to use when ordering Edition."""
enum EditionsOrderBy {
  AWARD_BY_AWARD_ID__COUNTRY_ID_ASC
  AWARD_BY_AWARD_ID__COUNTRY_ID_DESC
  AWARD_BY_AWARD_ID__DESCRIPTION_ASC
  AWARD_BY_AWARD_ID__DESCRIPTION_DESC
  AWARD_BY_AWARD_ID__ID_ASC
  AWARD_BY_AWARD_ID__ID_DESC
  AWARD_BY_AWARD_ID__LINK_ASC
  AWARD_BY_AWARD_ID__LINK_DESC
  AWARD_BY_AWARD_ID__LOGO_ASC
  AWARD_BY_AWARD_ID__LOGO_DESC
  AWARD_BY_AWARD_ID__NAME_LONG_ASC
  AWARD_BY_AWARD_ID__NAME_LONG_DESC
  AWARD_BY_AWARD_ID__NAME_SHORT_ASC
  AWARD_BY_AWARD_ID__NAME_SHORT_DESC
  AWARD_ID_ASC
  AWARD_ID_DESC
  DATE_ASC
  DATE_DESC
  EDITION_ADMIN_NOTES_BY_EDITION_ID__COUNT_ASC
  EDITION_ADMIN_NOTES_BY_EDITION_ID__COUNT_DESC
  FLAG_ASC
  FLAG_DESC
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  NOMINATIONS_BY_EDITION_ID__COUNT_ASC
  NOMINATIONS_BY_EDITION_ID__COUNT_DESC
  POSTER_ASC
  POSTER_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  PUBLISH_ASC
  PUBLISH_DESC
  WIKIPEDIA_ASC
  WIKIPEDIA_DESC
}

"""
A filter to be used against Float fields. All fields are combined with a logical ‘and.’
"""
input FloatFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Float

  """Equal to the specified value."""
  equalTo: Float

  """Greater than the specified value."""
  greaterThan: Float

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Float

  """Included in the specified list."""
  in: [Float!]

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: Float

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Float

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Float

  """Not equal to the specified value."""
  notEqualTo: Float

  """Not included in the specified list."""
  notIn: [Float!]
}

type Genre implements Node {
  id: Int!

  """Reads and enables pagination through a set of MovieGenre."""
  movieGenres(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieGenreCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieGenreFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieGenre."""
    orderBy: [MovieGenresOrderBy!] = [NATURAL]
  ): MovieGenresConnection!
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  tmdbId: Int
}

"""
A condition to be used against Genre object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input GenreCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s tmdbId field."""
  tmdbId: Int
}

"""
A filter to be used against Genre object types. All fields are combined with a logical ‘and.’
"""
input GenreFilter {
  """Checks for all expressions in this list."""
  and: [GenreFilter!]

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: GenreFilter

  """Checks for any expressions in this list."""
  or: [GenreFilter!]

  """Filter by the object’s tmdbId field."""
  tmdbId: IntFilter
}

"""An input for mutations affecting Genre"""
input GenreInput {
  id: Int
  name: String
  tmdbId: Int
}

"""
Represents an update to a Genre. Fields that are set will be updated.
"""
input GenrePatch {
  id: Int
  name: String
  tmdbId: Int
}

"""A connection to a list of Genre values."""
type GenresConnection {
  """
  A list of edges which contains the Genre and cursor to aid in pagination.
  """
  edges: [GenresEdge!]!

  """A list of Genre objects."""
  nodes: [Genre]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Genre you could get from the connection."""
  totalCount: Int!
}

"""A Genre edge in the connection."""
type GenresEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Genre at the end of the edge."""
  node: Genre
}

"""Methods to use when ordering Genre."""
enum GenresOrderBy {
  ID_ASC
  ID_DESC
  MOVIE_GENRES_BY_GENRE_ID__COUNT_ASC
  MOVIE_GENRES_BY_GENRE_ID__COUNT_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  TMDB_ID_ASC
  TMDB_ID_DESC
}

"""
A filter to be used against Int fields. All fields are combined with a logical ‘and.’
"""
input IntFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Int

  """Equal to the specified value."""
  equalTo: Int

  """Greater than the specified value."""
  greaterThan: Int

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Int

  """Included in the specified list."""
  in: [Int!]

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: Int

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Int

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Int

  """Not equal to the specified value."""
  notEqualTo: Int

  """Not included in the specified list."""
  notIn: [Int!]
}

type Job implements Node {
  """Reads a single Department that is related to this Job."""
  department: Department
  departmentId: Int
  id: Int!
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of NominatedPerson."""
  nominatedPeople(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominatedPersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominatedPersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominatedPeopleConnection!
}

"""
A condition to be used against Job object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input JobCondition {
  """Checks for equality with the object’s departmentId field."""
  departmentId: Int

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String
}

"""
A filter to be used against Job object types. All fields are combined with a logical ‘and.’
"""
input JobFilter {
  """Checks for all expressions in this list."""
  and: [JobFilter!]

  """Filter by the object’s departmentId field."""
  departmentId: IntFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: JobFilter

  """Checks for any expressions in this list."""
  or: [JobFilter!]
}

"""An input for mutations affecting Job"""
input JobInput {
  departmentId: Int
  id: Int
  name: String
}

"""Represents an update to a Job. Fields that are set will be updated."""
input JobPatch {
  departmentId: Int
  id: Int
  name: String
}

"""A connection to a list of Job values."""
type JobsConnection {
  """
  A list of edges which contains the Job and cursor to aid in pagination.
  """
  edges: [JobsEdge!]!

  """A list of Job objects."""
  nodes: [Job]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Job you could get from the connection."""
  totalCount: Int!
}

"""A Job edge in the connection."""
type JobsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Job at the end of the edge."""
  node: Job
}

"""Methods to use when ordering Job."""
enum JobsOrderBy {
  DEPARTMENT_BY_DEPARTMENT_ID__ID_ASC
  DEPARTMENT_BY_DEPARTMENT_ID__ID_DESC
  DEPARTMENT_BY_DEPARTMENT_ID__NAME_ASC
  DEPARTMENT_BY_DEPARTMENT_ID__NAME_DESC
  DEPARTMENT_ID_ASC
  DEPARTMENT_ID_DESC
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  NOMINATED_PEOPLE_BY_JOB_ID__COUNT_ASC
  NOMINATED_PEOPLE_BY_JOB_ID__COUNT_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

type Movie implements Node {
  backdropPath: String
  homepage: String
  id: Int!
  imdbId: String

  """Reads and enables pagination through a set of MovieBackdrop."""
  movieBackdrops(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieBackdropCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieBackdropFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieBackdrop."""
    orderBy: [MovieBackdropsOrderBy!] = [PRIMARY_KEY_ASC]
  ): MovieBackdropsConnection!

  """Reads and enables pagination through a set of MovieCountry."""
  movieCountries(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieCountryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieCountryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieCountry."""
    orderBy: [MovieCountriesOrderBy!] = [NATURAL]
  ): MovieCountriesConnection!

  """Reads and enables pagination through a set of MovieGenre."""
  movieGenres(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieGenreCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieGenreFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieGenre."""
    orderBy: [MovieGenresOrderBy!] = [NATURAL]
  ): MovieGenresConnection!

  """Reads and enables pagination through a set of MoviePoster."""
  moviePosters(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MoviePosterCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MoviePosterFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MoviePoster."""
    orderBy: [MoviePostersOrderBy!] = [PRIMARY_KEY_ASC]
  ): MoviePostersConnection!

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of Nomination."""
  nominations(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominationFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominationsConnection!
  originalLanguage: String
  originalTitle: String
  overview: String
  posterPath: String
  releaseDate: Date
  runtime: Int
  tagline: String
  title: String
  tmdbId: Int
}

type MovieBackdrop implements Node {
  filename: String
  id: Int!

  """Reads a single Movie that is related to this MovieBackdrop."""
  movie: Movie
  movieId: Int

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""
A condition to be used against MovieBackdrop object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input MovieBackdropCondition {
  """Checks for equality with the object’s filename field."""
  filename: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s movieId field."""
  movieId: Int
}

"""
A filter to be used against MovieBackdrop object types. All fields are combined with a logical ‘and.’
"""
input MovieBackdropFilter {
  """Checks for all expressions in this list."""
  and: [MovieBackdropFilter!]

  """Filter by the object’s filename field."""
  filename: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s movieId field."""
  movieId: IntFilter

  """Negates the expression."""
  not: MovieBackdropFilter

  """Checks for any expressions in this list."""
  or: [MovieBackdropFilter!]
}

"""An input for mutations affecting MovieBackdrop"""
input MovieBackdropInput {
  filename: String
  id: Int
  movieId: Int
}

"""
Represents an update to a MovieBackdrop. Fields that are set will be updated.
"""
input MovieBackdropPatch {
  filename: String
  id: Int
  movieId: Int
}

"""A connection to a list of MovieBackdrop values."""
type MovieBackdropsConnection {
  """
  A list of edges which contains the MovieBackdrop and cursor to aid in pagination.
  """
  edges: [MovieBackdropsEdge!]!

  """A list of MovieBackdrop objects."""
  nodes: [MovieBackdrop]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* MovieBackdrop you could get from the connection."""
  totalCount: Int!
}

"""A MovieBackdrop edge in the connection."""
type MovieBackdropsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The MovieBackdrop at the end of the edge."""
  node: MovieBackdrop
}

"""Methods to use when ordering MovieBackdrop."""
enum MovieBackdropsOrderBy {
  FILENAME_ASC
  FILENAME_DESC
  ID_ASC
  ID_DESC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_ASC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_DESC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_ASC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_DESC
  MOVIE_BY_MOVIE_ID__ID_ASC
  MOVIE_BY_MOVIE_ID__ID_DESC
  MOVIE_BY_MOVIE_ID__IMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__IMDB_ID_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_DESC
  MOVIE_BY_MOVIE_ID__OVERVIEW_ASC
  MOVIE_BY_MOVIE_ID__OVERVIEW_DESC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_ASC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_DESC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_ASC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_DESC
  MOVIE_BY_MOVIE_ID__RUNTIME_ASC
  MOVIE_BY_MOVIE_ID__RUNTIME_DESC
  MOVIE_BY_MOVIE_ID__TAGLINE_ASC
  MOVIE_BY_MOVIE_ID__TAGLINE_DESC
  MOVIE_BY_MOVIE_ID__TITLE_ASC
  MOVIE_BY_MOVIE_ID__TITLE_DESC
  MOVIE_BY_MOVIE_ID__TMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__TMDB_ID_DESC
  MOVIE_ID_ASC
  MOVIE_ID_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Movie object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input MovieCondition {
  """Checks for equality with the object’s backdropPath field."""
  backdropPath: String

  """Checks for equality with the object’s homepage field."""
  homepage: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s imdbId field."""
  imdbId: String

  """Checks for equality with the object’s originalLanguage field."""
  originalLanguage: String

  """Checks for equality with the object’s originalTitle field."""
  originalTitle: String

  """Checks for equality with the object’s overview field."""
  overview: String

  """Checks for equality with the object’s posterPath field."""
  posterPath: String

  """Checks for equality with the object’s releaseDate field."""
  releaseDate: Date

  """Checks for equality with the object’s runtime field."""
  runtime: Int

  """Checks for equality with the object’s tagline field."""
  tagline: String

  """Checks for equality with the object’s title field."""
  title: String

  """Checks for equality with the object’s tmdbId field."""
  tmdbId: Int
}

"""A connection to a list of MovieCountry values."""
type MovieCountriesConnection {
  """
  A list of edges which contains the MovieCountry and cursor to aid in pagination.
  """
  edges: [MovieCountriesEdge!]!

  """A list of MovieCountry objects."""
  nodes: [MovieCountry]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* MovieCountry you could get from the connection."""
  totalCount: Int!
}

"""A MovieCountry edge in the connection."""
type MovieCountriesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The MovieCountry at the end of the edge."""
  node: MovieCountry
}

"""Methods to use when ordering MovieCountry."""
enum MovieCountriesOrderBy {
  COUNTRY_BY_COUNTRY_ID__CODE_ASC
  COUNTRY_BY_COUNTRY_ID__CODE_DESC
  COUNTRY_BY_COUNTRY_ID__ID_ASC
  COUNTRY_BY_COUNTRY_ID__ID_DESC
  COUNTRY_BY_COUNTRY_ID__NAME_ASC
  COUNTRY_BY_COUNTRY_ID__NAME_DESC
  COUNTRY_ID_ASC
  COUNTRY_ID_DESC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_ASC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_DESC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_ASC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_DESC
  MOVIE_BY_MOVIE_ID__ID_ASC
  MOVIE_BY_MOVIE_ID__ID_DESC
  MOVIE_BY_MOVIE_ID__IMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__IMDB_ID_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_DESC
  MOVIE_BY_MOVIE_ID__OVERVIEW_ASC
  MOVIE_BY_MOVIE_ID__OVERVIEW_DESC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_ASC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_DESC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_ASC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_DESC
  MOVIE_BY_MOVIE_ID__RUNTIME_ASC
  MOVIE_BY_MOVIE_ID__RUNTIME_DESC
  MOVIE_BY_MOVIE_ID__TAGLINE_ASC
  MOVIE_BY_MOVIE_ID__TAGLINE_DESC
  MOVIE_BY_MOVIE_ID__TITLE_ASC
  MOVIE_BY_MOVIE_ID__TITLE_DESC
  MOVIE_BY_MOVIE_ID__TMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__TMDB_ID_DESC
  MOVIE_ID_ASC
  MOVIE_ID_DESC
  NATURAL
}

type MovieCountry {
  """Reads a single Country that is related to this MovieCountry."""
  country: Country
  countryId: Int

  """Reads a single Movie that is related to this MovieCountry."""
  movie: Movie
  movieId: Int
}

"""
A condition to be used against MovieCountry object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input MovieCountryCondition {
  """Checks for equality with the object’s countryId field."""
  countryId: Int

  """Checks for equality with the object’s movieId field."""
  movieId: Int
}

"""
A filter to be used against MovieCountry object types. All fields are combined with a logical ‘and.’
"""
input MovieCountryFilter {
  """Checks for all expressions in this list."""
  and: [MovieCountryFilter!]

  """Filter by the object’s countryId field."""
  countryId: IntFilter

  """Filter by the object’s movieId field."""
  movieId: IntFilter

  """Negates the expression."""
  not: MovieCountryFilter

  """Checks for any expressions in this list."""
  or: [MovieCountryFilter!]
}

"""An input for mutations affecting MovieCountry"""
input MovieCountryInput {
  countryId: Int
  movieId: Int
}

"""
A filter to be used against Movie object types. All fields are combined with a logical ‘and.’
"""
input MovieFilter {
  """Checks for all expressions in this list."""
  and: [MovieFilter!]

  """Filter by the object’s backdropPath field."""
  backdropPath: StringFilter

  """Filter by the object’s homepage field."""
  homepage: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s imdbId field."""
  imdbId: StringFilter

  """Negates the expression."""
  not: MovieFilter

  """Checks for any expressions in this list."""
  or: [MovieFilter!]

  """Filter by the object’s originalLanguage field."""
  originalLanguage: StringFilter

  """Filter by the object’s originalTitle field."""
  originalTitle: StringFilter

  """Filter by the object’s overview field."""
  overview: StringFilter

  """Filter by the object’s posterPath field."""
  posterPath: StringFilter

  """Filter by the object’s releaseDate field."""
  releaseDate: DateFilter

  """Filter by the object’s runtime field."""
  runtime: IntFilter

  """Filter by the object’s tagline field."""
  tagline: StringFilter

  """Filter by the object’s title field."""
  title: StringFilter

  """Filter by the object’s tmdbId field."""
  tmdbId: IntFilter
}

type MovieGenre {
  """Reads a single Genre that is related to this MovieGenre."""
  genre: Genre
  genreId: Int

  """Reads a single Movie that is related to this MovieGenre."""
  movie: Movie
  movieId: Int
}

"""
A condition to be used against MovieGenre object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input MovieGenreCondition {
  """Checks for equality with the object’s genreId field."""
  genreId: Int

  """Checks for equality with the object’s movieId field."""
  movieId: Int
}

"""
A filter to be used against MovieGenre object types. All fields are combined with a logical ‘and.’
"""
input MovieGenreFilter {
  """Checks for all expressions in this list."""
  and: [MovieGenreFilter!]

  """Filter by the object’s genreId field."""
  genreId: IntFilter

  """Filter by the object’s movieId field."""
  movieId: IntFilter

  """Negates the expression."""
  not: MovieGenreFilter

  """Checks for any expressions in this list."""
  or: [MovieGenreFilter!]
}

"""An input for mutations affecting MovieGenre"""
input MovieGenreInput {
  genreId: Int
  movieId: Int
}

"""A connection to a list of MovieGenre values."""
type MovieGenresConnection {
  """
  A list of edges which contains the MovieGenre and cursor to aid in pagination.
  """
  edges: [MovieGenresEdge!]!

  """A list of MovieGenre objects."""
  nodes: [MovieGenre]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* MovieGenre you could get from the connection."""
  totalCount: Int!
}

"""A MovieGenre edge in the connection."""
type MovieGenresEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The MovieGenre at the end of the edge."""
  node: MovieGenre
}

"""Methods to use when ordering MovieGenre."""
enum MovieGenresOrderBy {
  GENRE_BY_GENRE_ID__ID_ASC
  GENRE_BY_GENRE_ID__ID_DESC
  GENRE_BY_GENRE_ID__NAME_ASC
  GENRE_BY_GENRE_ID__NAME_DESC
  GENRE_BY_GENRE_ID__TMDB_ID_ASC
  GENRE_BY_GENRE_ID__TMDB_ID_DESC
  GENRE_ID_ASC
  GENRE_ID_DESC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_ASC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_DESC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_ASC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_DESC
  MOVIE_BY_MOVIE_ID__ID_ASC
  MOVIE_BY_MOVIE_ID__ID_DESC
  MOVIE_BY_MOVIE_ID__IMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__IMDB_ID_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_DESC
  MOVIE_BY_MOVIE_ID__OVERVIEW_ASC
  MOVIE_BY_MOVIE_ID__OVERVIEW_DESC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_ASC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_DESC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_ASC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_DESC
  MOVIE_BY_MOVIE_ID__RUNTIME_ASC
  MOVIE_BY_MOVIE_ID__RUNTIME_DESC
  MOVIE_BY_MOVIE_ID__TAGLINE_ASC
  MOVIE_BY_MOVIE_ID__TAGLINE_DESC
  MOVIE_BY_MOVIE_ID__TITLE_ASC
  MOVIE_BY_MOVIE_ID__TITLE_DESC
  MOVIE_BY_MOVIE_ID__TMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__TMDB_ID_DESC
  MOVIE_ID_ASC
  MOVIE_ID_DESC
  NATURAL
}

"""An input for mutations affecting Movie"""
input MovieInput {
  backdropPath: String
  homepage: String
  id: Int
  imdbId: String
  originalLanguage: String
  originalTitle: String
  overview: String
  posterPath: String
  releaseDate: Date
  runtime: Int
  tagline: String
  title: String
  tmdbId: Int
}

"""
Represents an update to a Movie. Fields that are set will be updated.
"""
input MoviePatch {
  backdropPath: String
  homepage: String
  id: Int
  imdbId: String
  originalLanguage: String
  originalTitle: String
  overview: String
  posterPath: String
  releaseDate: Date
  runtime: Int
  tagline: String
  title: String
  tmdbId: Int
}

type MoviePoster implements Node {
  filename: String
  id: Int!

  """Reads a single Movie that is related to this MoviePoster."""
  movie: Movie
  movieId: Int

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""
A condition to be used against MoviePoster object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input MoviePosterCondition {
  """Checks for equality with the object’s filename field."""
  filename: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s movieId field."""
  movieId: Int
}

"""
A filter to be used against MoviePoster object types. All fields are combined with a logical ‘and.’
"""
input MoviePosterFilter {
  """Checks for all expressions in this list."""
  and: [MoviePosterFilter!]

  """Filter by the object’s filename field."""
  filename: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s movieId field."""
  movieId: IntFilter

  """Negates the expression."""
  not: MoviePosterFilter

  """Checks for any expressions in this list."""
  or: [MoviePosterFilter!]
}

"""An input for mutations affecting MoviePoster"""
input MoviePosterInput {
  filename: String
  id: Int
  movieId: Int
}

"""
Represents an update to a MoviePoster. Fields that are set will be updated.
"""
input MoviePosterPatch {
  filename: String
  id: Int
  movieId: Int
}

"""A connection to a list of MoviePoster values."""
type MoviePostersConnection {
  """
  A list of edges which contains the MoviePoster and cursor to aid in pagination.
  """
  edges: [MoviePostersEdge!]!

  """A list of MoviePoster objects."""
  nodes: [MoviePoster]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* MoviePoster you could get from the connection."""
  totalCount: Int!
}

"""A MoviePoster edge in the connection."""
type MoviePostersEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The MoviePoster at the end of the edge."""
  node: MoviePoster
}

"""Methods to use when ordering MoviePoster."""
enum MoviePostersOrderBy {
  FILENAME_ASC
  FILENAME_DESC
  ID_ASC
  ID_DESC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_ASC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_DESC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_ASC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_DESC
  MOVIE_BY_MOVIE_ID__ID_ASC
  MOVIE_BY_MOVIE_ID__ID_DESC
  MOVIE_BY_MOVIE_ID__IMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__IMDB_ID_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_DESC
  MOVIE_BY_MOVIE_ID__OVERVIEW_ASC
  MOVIE_BY_MOVIE_ID__OVERVIEW_DESC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_ASC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_DESC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_ASC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_DESC
  MOVIE_BY_MOVIE_ID__RUNTIME_ASC
  MOVIE_BY_MOVIE_ID__RUNTIME_DESC
  MOVIE_BY_MOVIE_ID__TAGLINE_ASC
  MOVIE_BY_MOVIE_ID__TAGLINE_DESC
  MOVIE_BY_MOVIE_ID__TITLE_ASC
  MOVIE_BY_MOVIE_ID__TITLE_DESC
  MOVIE_BY_MOVIE_ID__TMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__TMDB_ID_DESC
  MOVIE_ID_ASC
  MOVIE_ID_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""A connection to a list of Movie values."""
type MoviesConnection {
  """
  A list of edges which contains the Movie and cursor to aid in pagination.
  """
  edges: [MoviesEdge!]!

  """A list of Movie objects."""
  nodes: [Movie]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Movie you could get from the connection."""
  totalCount: Int!
}

"""A Movie edge in the connection."""
type MoviesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Movie at the end of the edge."""
  node: Movie
}

"""Methods to use when ordering Movie."""
enum MoviesOrderBy {
  BACKDROP_PATH_ASC
  BACKDROP_PATH_DESC
  HOMEPAGE_ASC
  HOMEPAGE_DESC
  ID_ASC
  ID_DESC
  IMDB_ID_ASC
  IMDB_ID_DESC
  MOVIE_BACKDROPS_BY_MOVIE_ID__COUNT_ASC
  MOVIE_BACKDROPS_BY_MOVIE_ID__COUNT_DESC
  MOVIE_COUNTRIES_BY_MOVIE_ID__COUNT_ASC
  MOVIE_COUNTRIES_BY_MOVIE_ID__COUNT_DESC
  MOVIE_GENRES_BY_MOVIE_ID__COUNT_ASC
  MOVIE_GENRES_BY_MOVIE_ID__COUNT_DESC
  MOVIE_POSTERS_BY_MOVIE_ID__COUNT_ASC
  MOVIE_POSTERS_BY_MOVIE_ID__COUNT_DESC
  NATURAL
  NOMINATIONS_BY_MOVIE_ID__COUNT_ASC
  NOMINATIONS_BY_MOVIE_ID__COUNT_DESC
  ORIGINAL_LANGUAGE_ASC
  ORIGINAL_LANGUAGE_DESC
  ORIGINAL_TITLE_ASC
  ORIGINAL_TITLE_DESC
  OVERVIEW_ASC
  OVERVIEW_DESC
  POSTER_PATH_ASC
  POSTER_PATH_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  RELEASE_DATE_ASC
  RELEASE_DATE_DESC
  RUNTIME_ASC
  RUNTIME_DESC
  TAGLINE_ASC
  TAGLINE_DESC
  TITLE_ASC
  TITLE_DESC
  TMDB_ID_ASC
  TMDB_ID_DESC
}

"""
The root mutation type which contains root level fields which mutate data.
"""
type Mutation {
  """Creates a single Award."""
  createAward(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateAwardInput!
  ): CreateAwardPayload

  """Creates a single Category."""
  createCategory(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateCategoryInput!
  ): CreateCategoryPayload

  """Creates a single Country."""
  createCountry(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateCountryInput!
  ): CreateCountryPayload

  """Creates a single Department."""
  createDepartment(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateDepartmentInput!
  ): CreateDepartmentPayload

  """Creates a single Edition."""
  createEdition(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateEditionInput!
  ): CreateEditionPayload

  """Creates a single EditionAdminNote."""
  createEditionAdminNote(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateEditionAdminNoteInput!
  ): CreateEditionAdminNotePayload

  """Creates a single Genre."""
  createGenre(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateGenreInput!
  ): CreateGenrePayload

  """Creates a single Job."""
  createJob(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateJobInput!
  ): CreateJobPayload

  """Creates a single Movie."""
  createMovie(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateMovieInput!
  ): CreateMoviePayload

  """Creates a single MovieBackdrop."""
  createMovieBackdrop(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateMovieBackdropInput!
  ): CreateMovieBackdropPayload

  """Creates a single MovieCountry."""
  createMovieCountry(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateMovieCountryInput!
  ): CreateMovieCountryPayload

  """Creates a single MovieGenre."""
  createMovieGenre(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateMovieGenreInput!
  ): CreateMovieGenrePayload

  """Creates a single MoviePoster."""
  createMoviePoster(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateMoviePosterInput!
  ): CreateMoviePosterPayload

  """Creates a single NominatedPerson."""
  createNominatedPerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateNominatedPersonInput!
  ): CreateNominatedPersonPayload

  """Creates a single Nomination."""
  createNomination(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateNominationInput!
  ): CreateNominationPayload

  """Creates a single Person."""
  createPerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreatePersonInput!
  ): CreatePersonPayload

  """Creates a single Prize."""
  createPrize(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreatePrizeInput!
  ): CreatePrizePayload

  """Creates a single User."""
  createUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateUserInput!
  ): CreateUserPayload

  """Deletes a single Award using a unique key."""
  deleteAward(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAwardInput!
  ): DeleteAwardPayload

  """Deletes a single Award using a unique key."""
  deleteAwardByLink(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAwardByLinkInput!
  ): DeleteAwardPayload

  """Deletes a single Award using a unique key."""
  deleteAwardByNameShort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAwardByNameShortInput!
  ): DeleteAwardPayload

  """Deletes a single Award using its globally unique id."""
  deleteAwardByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAwardByNodeIdInput!
  ): DeleteAwardPayload

  """Deletes a single Category using a unique key."""
  deleteCategory(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCategoryInput!
  ): DeleteCategoryPayload

  """Deletes a single Category using a unique key."""
  deleteCategoryById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCategoryByIdInput!
  ): DeleteCategoryPayload

  """Deletes a single Category using its globally unique id."""
  deleteCategoryByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCategoryByNodeIdInput!
  ): DeleteCategoryPayload

  """Deletes a single Country using a unique key."""
  deleteCountry(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCountryInput!
  ): DeleteCountryPayload

  """Deletes a single Country using a unique key."""
  deleteCountryByCode(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCountryByCodeInput!
  ): DeleteCountryPayload

  """Deletes a single Country using its globally unique id."""
  deleteCountryByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteCountryByNodeIdInput!
  ): DeleteCountryPayload

  """Deletes a single Department using a unique key."""
  deleteDepartment(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDepartmentInput!
  ): DeleteDepartmentPayload

  """Deletes a single Department using its globally unique id."""
  deleteDepartmentByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDepartmentByNodeIdInput!
  ): DeleteDepartmentPayload

  """Deletes a single Edition using a unique key."""
  deleteEdition(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteEditionInput!
  ): DeleteEditionPayload

  """Deletes a single EditionAdminNote using a unique key."""
  deleteEditionAdminNote(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteEditionAdminNoteInput!
  ): DeleteEditionAdminNotePayload

  """Deletes a single EditionAdminNote using its globally unique id."""
  deleteEditionAdminNoteByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteEditionAdminNoteByNodeIdInput!
  ): DeleteEditionAdminNotePayload

  """Deletes a single Edition using its globally unique id."""
  deleteEditionByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteEditionByNodeIdInput!
  ): DeleteEditionPayload

  """Deletes a single Genre using a unique key."""
  deleteGenre(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteGenreInput!
  ): DeleteGenrePayload

  """Deletes a single Genre using its globally unique id."""
  deleteGenreByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteGenreByNodeIdInput!
  ): DeleteGenrePayload

  """Deletes a single Job using a unique key."""
  deleteJob(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteJobInput!
  ): DeleteJobPayload

  """Deletes a single Job using its globally unique id."""
  deleteJobByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteJobByNodeIdInput!
  ): DeleteJobPayload

  """Deletes a single Movie using a unique key."""
  deleteMovie(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMovieInput!
  ): DeleteMoviePayload

  """Deletes a single MovieBackdrop using a unique key."""
  deleteMovieBackdrop(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMovieBackdropInput!
  ): DeleteMovieBackdropPayload

  """Deletes a single MovieBackdrop using its globally unique id."""
  deleteMovieBackdropByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMovieBackdropByNodeIdInput!
  ): DeleteMovieBackdropPayload

  """Deletes a single Movie using its globally unique id."""
  deleteMovieByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMovieByNodeIdInput!
  ): DeleteMoviePayload

  """Deletes a single MoviePoster using a unique key."""
  deleteMoviePoster(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMoviePosterInput!
  ): DeleteMoviePosterPayload

  """Deletes a single MoviePoster using its globally unique id."""
  deleteMoviePosterByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteMoviePosterByNodeIdInput!
  ): DeleteMoviePosterPayload

  """Deletes a single NominatedPerson using a unique key."""
  deleteNominatedPerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteNominatedPersonInput!
  ): DeleteNominatedPersonPayload

  """Deletes a single NominatedPerson using its globally unique id."""
  deleteNominatedPersonByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteNominatedPersonByNodeIdInput!
  ): DeleteNominatedPersonPayload

  """Deletes a single Nomination using a unique key."""
  deleteNomination(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteNominationInput!
  ): DeleteNominationPayload

  """Deletes a single Nomination using its globally unique id."""
  deleteNominationByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteNominationByNodeIdInput!
  ): DeleteNominationPayload

  """Deletes a single Person using a unique key."""
  deletePerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePersonInput!
  ): DeletePersonPayload

  """Deletes a single Person using its globally unique id."""
  deletePersonByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePersonByNodeIdInput!
  ): DeletePersonPayload

  """Deletes a single Prize using a unique key."""
  deletePrizeById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePrizeByIdInput!
  ): DeletePrizePayload

  """Deletes a single User using a unique key."""
  deleteUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserInput!
  ): DeleteUserPayload

  """Deletes a single User using a unique key."""
  deleteUserByEmail(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserByEmailInput!
  ): DeleteUserPayload

  """Deletes a single User using its globally unique id."""
  deleteUserByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserByNodeIdInput!
  ): DeleteUserPayload

  """Updates a single Award using a unique key and a patch."""
  updateAward(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAwardInput!
  ): UpdateAwardPayload

  """Updates a single Award using a unique key and a patch."""
  updateAwardByLink(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAwardByLinkInput!
  ): UpdateAwardPayload

  """Updates a single Award using a unique key and a patch."""
  updateAwardByNameShort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAwardByNameShortInput!
  ): UpdateAwardPayload

  """Updates a single Award using its globally unique id and a patch."""
  updateAwardByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAwardByNodeIdInput!
  ): UpdateAwardPayload

  """Updates a single Category using a unique key and a patch."""
  updateCategory(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCategoryInput!
  ): UpdateCategoryPayload

  """Updates a single Category using a unique key and a patch."""
  updateCategoryById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCategoryByIdInput!
  ): UpdateCategoryPayload

  """Updates a single Category using its globally unique id and a patch."""
  updateCategoryByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCategoryByNodeIdInput!
  ): UpdateCategoryPayload

  """Updates a single Country using a unique key and a patch."""
  updateCountry(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCountryInput!
  ): UpdateCountryPayload

  """Updates a single Country using a unique key and a patch."""
  updateCountryByCode(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCountryByCodeInput!
  ): UpdateCountryPayload

  """Updates a single Country using its globally unique id and a patch."""
  updateCountryByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateCountryByNodeIdInput!
  ): UpdateCountryPayload

  """Updates a single Department using a unique key and a patch."""
  updateDepartment(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDepartmentInput!
  ): UpdateDepartmentPayload

  """
  Updates a single Department using its globally unique id and a patch.
  """
  updateDepartmentByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDepartmentByNodeIdInput!
  ): UpdateDepartmentPayload

  """Updates a single Edition using a unique key and a patch."""
  updateEdition(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateEditionInput!
  ): UpdateEditionPayload

  """Updates a single EditionAdminNote using a unique key and a patch."""
  updateEditionAdminNote(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateEditionAdminNoteInput!
  ): UpdateEditionAdminNotePayload

  """
  Updates a single EditionAdminNote using its globally unique id and a patch.
  """
  updateEditionAdminNoteByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateEditionAdminNoteByNodeIdInput!
  ): UpdateEditionAdminNotePayload

  """Updates a single Edition using its globally unique id and a patch."""
  updateEditionByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateEditionByNodeIdInput!
  ): UpdateEditionPayload

  """Updates a single Genre using a unique key and a patch."""
  updateGenre(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateGenreInput!
  ): UpdateGenrePayload

  """Updates a single Genre using its globally unique id and a patch."""
  updateGenreByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateGenreByNodeIdInput!
  ): UpdateGenrePayload

  """Updates a single Job using a unique key and a patch."""
  updateJob(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateJobInput!
  ): UpdateJobPayload

  """Updates a single Job using its globally unique id and a patch."""
  updateJobByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateJobByNodeIdInput!
  ): UpdateJobPayload

  """Updates a single Movie using a unique key and a patch."""
  updateMovie(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMovieInput!
  ): UpdateMoviePayload

  """Updates a single MovieBackdrop using a unique key and a patch."""
  updateMovieBackdrop(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMovieBackdropInput!
  ): UpdateMovieBackdropPayload

  """
  Updates a single MovieBackdrop using its globally unique id and a patch.
  """
  updateMovieBackdropByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMovieBackdropByNodeIdInput!
  ): UpdateMovieBackdropPayload

  """Updates a single Movie using its globally unique id and a patch."""
  updateMovieByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMovieByNodeIdInput!
  ): UpdateMoviePayload

  """Updates a single MoviePoster using a unique key and a patch."""
  updateMoviePoster(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMoviePosterInput!
  ): UpdateMoviePosterPayload

  """
  Updates a single MoviePoster using its globally unique id and a patch.
  """
  updateMoviePosterByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateMoviePosterByNodeIdInput!
  ): UpdateMoviePosterPayload

  """Updates a single NominatedPerson using a unique key and a patch."""
  updateNominatedPerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateNominatedPersonInput!
  ): UpdateNominatedPersonPayload

  """
  Updates a single NominatedPerson using its globally unique id and a patch.
  """
  updateNominatedPersonByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateNominatedPersonByNodeIdInput!
  ): UpdateNominatedPersonPayload

  """Updates a single Nomination using a unique key and a patch."""
  updateNomination(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateNominationInput!
  ): UpdateNominationPayload

  """
  Updates a single Nomination using its globally unique id and a patch.
  """
  updateNominationByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateNominationByNodeIdInput!
  ): UpdateNominationPayload

  """Updates a single Person using a unique key and a patch."""
  updatePerson(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePersonInput!
  ): UpdatePersonPayload

  """Updates a single Person using its globally unique id and a patch."""
  updatePersonByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePersonByNodeIdInput!
  ): UpdatePersonPayload

  """Updates a single Prize using a unique key and a patch."""
  updatePrizeById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePrizeByIdInput!
  ): UpdatePrizePayload

  """Updates a single User using a unique key and a patch."""
  updateUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserInput!
  ): UpdateUserPayload

  """Updates a single User using a unique key and a patch."""
  updateUserByEmail(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserByEmailInput!
  ): UpdateUserPayload

  """Updates a single User using its globally unique id and a patch."""
  updateUserByNodeId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserByNodeIdInput!
  ): UpdateUserPayload
}

"""An object with a globally unique ID."""
interface Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""A connection to a list of NominatedPerson values."""
type NominatedPeopleConnection {
  """
  A list of edges which contains the NominatedPerson and cursor to aid in pagination.
  """
  edges: [NominatedPeopleEdge!]!

  """A list of NominatedPerson objects."""
  nodes: [NominatedPerson]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """
  The count of *all* NominatedPerson you could get from the connection.
  """
  totalCount: Int!
}

"""A NominatedPerson edge in the connection."""
type NominatedPeopleEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The NominatedPerson at the end of the edge."""
  node: NominatedPerson
}

"""Methods to use when ordering NominatedPerson."""
enum NominatedPeopleOrderBy {
  CHARACTER_ASC
  CHARACTER_DESC
  ID_ASC
  ID_DESC
  JOB_BY_JOB_ID__DEPARTMENT_ID_ASC
  JOB_BY_JOB_ID__DEPARTMENT_ID_DESC
  JOB_BY_JOB_ID__ID_ASC
  JOB_BY_JOB_ID__ID_DESC
  JOB_BY_JOB_ID__NAME_ASC
  JOB_BY_JOB_ID__NAME_DESC
  JOB_ID_ASC
  JOB_ID_DESC
  NATURAL
  NOMINATION_BY_NOMINATION_ID__AWARD_ID_ASC
  NOMINATION_BY_NOMINATION_ID__AWARD_ID_DESC
  NOMINATION_BY_NOMINATION_ID__CATEGORY_ID_ASC
  NOMINATION_BY_NOMINATION_ID__CATEGORY_ID_DESC
  NOMINATION_BY_NOMINATION_ID__CATEGORY_ORDER_ASC
  NOMINATION_BY_NOMINATION_ID__CATEGORY_ORDER_DESC
  NOMINATION_BY_NOMINATION_ID__EDITION_ID_ASC
  NOMINATION_BY_NOMINATION_ID__EDITION_ID_DESC
  NOMINATION_BY_NOMINATION_ID__EXTRA_INFO_ASC
  NOMINATION_BY_NOMINATION_ID__EXTRA_INFO_DESC
  NOMINATION_BY_NOMINATION_ID__FLAGGED_ASC
  NOMINATION_BY_NOMINATION_ID__FLAGGED_DESC
  NOMINATION_BY_NOMINATION_ID__ID_ASC
  NOMINATION_BY_NOMINATION_ID__ID_DESC
  NOMINATION_BY_NOMINATION_ID__MOVIE_ID_ASC
  NOMINATION_BY_NOMINATION_ID__MOVIE_ID_DESC
  NOMINATION_BY_NOMINATION_ID__NOTE_ASC
  NOMINATION_BY_NOMINATION_ID__NOTE_DESC
  NOMINATION_BY_NOMINATION_ID__WINNER_ASC
  NOMINATION_BY_NOMINATION_ID__WINNER_DESC
  NOMINATION_ID_ASC
  NOMINATION_ID_DESC
  PERSON_BY_PERSON_ID__ALSO_KNOWN_AS_ASC
  PERSON_BY_PERSON_ID__ALSO_KNOWN_AS_DESC
  PERSON_BY_PERSON_ID__BIOGRAPHY_ASC
  PERSON_BY_PERSON_ID__BIOGRAPHY_DESC
  PERSON_BY_PERSON_ID__BIRTHDAY_ASC
  PERSON_BY_PERSON_ID__BIRTHDAY_DESC
  PERSON_BY_PERSON_ID__DEATHDAY_ASC
  PERSON_BY_PERSON_ID__DEATHDAY_DESC
  PERSON_BY_PERSON_ID__GENDER_ASC
  PERSON_BY_PERSON_ID__GENDER_DESC
  PERSON_BY_PERSON_ID__HOMEPAGE_ASC
  PERSON_BY_PERSON_ID__HOMEPAGE_DESC
  PERSON_BY_PERSON_ID__ID_ASC
  PERSON_BY_PERSON_ID__ID_DESC
  PERSON_BY_PERSON_ID__IMDB_ID_ASC
  PERSON_BY_PERSON_ID__IMDB_ID_DESC
  PERSON_BY_PERSON_ID__NAME_ASC
  PERSON_BY_PERSON_ID__NAME_DESC
  PERSON_BY_PERSON_ID__PLACE_OF_BIRTH_ASC
  PERSON_BY_PERSON_ID__PLACE_OF_BIRTH_DESC
  PERSON_BY_PERSON_ID__POPULARITY_ASC
  PERSON_BY_PERSON_ID__POPULARITY_DESC
  PERSON_BY_PERSON_ID__PROFILE_PATH_ASC
  PERSON_BY_PERSON_ID__PROFILE_PATH_DESC
  PERSON_BY_PERSON_ID__TMDB_ID_ASC
  PERSON_BY_PERSON_ID__TMDB_ID_DESC
  PERSON_ID_ASC
  PERSON_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  PRIZE_BY_PRIZE_ID__AWARD_ID_ASC
  PRIZE_BY_PRIZE_ID__AWARD_ID_DESC
  PRIZE_BY_PRIZE_ID__CATEGORY_ID_ASC
  PRIZE_BY_PRIZE_ID__CATEGORY_ID_DESC
  PRIZE_BY_PRIZE_ID__DESCRIPTION_ASC
  PRIZE_BY_PRIZE_ID__DESCRIPTION_DESC
  PRIZE_BY_PRIZE_ID__DISPLAY_ASC
  PRIZE_BY_PRIZE_ID__DISPLAY_DESC
  PRIZE_BY_PRIZE_ID__ID_ASC
  PRIZE_BY_PRIZE_ID__ID_DESC
  PRIZE_BY_PRIZE_ID__IMPORTANT_ASC
  PRIZE_BY_PRIZE_ID__IMPORTANT_DESC
  PRIZE_BY_PRIZE_ID__NAME_ASC
  PRIZE_BY_PRIZE_ID__NAME_DESC
  PRIZE_BY_PRIZE_ID__ORDER_ASC
  PRIZE_BY_PRIZE_ID__ORDER_DESC
  PRIZE_ID_ASC
  PRIZE_ID_DESC
  TMDB_CREDIT_ID_ASC
  TMDB_CREDIT_ID_DESC
}

type NominatedPerson implements Node {
  character: String
  id: Int!

  """Reads a single Job that is related to this NominatedPerson."""
  job: Job
  jobId: Int

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads a single Nomination that is related to this NominatedPerson."""
  nomination: Nomination
  nominationId: Int

  """Reads a single Person that is related to this NominatedPerson."""
  person: Person
  personId: Int

  """Reads a single Prize that is related to this NominatedPerson."""
  prize: Prize
  prizeId: Int
  tmdbCreditId: String
}

"""
A condition to be used against NominatedPerson object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input NominatedPersonCondition {
  """Checks for equality with the object’s character field."""
  character: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s jobId field."""
  jobId: Int

  """Checks for equality with the object’s nominationId field."""
  nominationId: Int

  """Checks for equality with the object’s personId field."""
  personId: Int

  """Checks for equality with the object’s prizeId field."""
  prizeId: Int

  """Checks for equality with the object’s tmdbCreditId field."""
  tmdbCreditId: String
}

"""
A filter to be used against NominatedPerson object types. All fields are combined with a logical ‘and.’
"""
input NominatedPersonFilter {
  """Checks for all expressions in this list."""
  and: [NominatedPersonFilter!]

  """Filter by the object’s character field."""
  character: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s jobId field."""
  jobId: IntFilter

  """Filter by the object’s nominationId field."""
  nominationId: IntFilter

  """Negates the expression."""
  not: NominatedPersonFilter

  """Checks for any expressions in this list."""
  or: [NominatedPersonFilter!]

  """Filter by the object’s personId field."""
  personId: IntFilter

  """Filter by the object’s prizeId field."""
  prizeId: IntFilter

  """Filter by the object’s tmdbCreditId field."""
  tmdbCreditId: StringFilter
}

"""An input for mutations affecting NominatedPerson"""
input NominatedPersonInput {
  character: String
  id: Int
  jobId: Int
  nominationId: Int
  personId: Int
  prizeId: Int
  tmdbCreditId: String
}

"""
Represents an update to a NominatedPerson. Fields that are set will be updated.
"""
input NominatedPersonPatch {
  character: String
  id: Int
  jobId: Int
  nominationId: Int
  personId: Int
  prizeId: Int
  tmdbCreditId: String
}

type Nomination implements Node {
  """Reads a single Award that is related to this Nomination."""
  award: Award
  awardId: Int

  """Reads a single Category that is related to this Nomination."""
  category: Category
  categoryId: Int
  categoryOrder: Int

  """Reads a single Edition that is related to this Nomination."""
  edition: Edition
  editionId: Int
  extraInfo: String
  flagged: Boolean
  id: Int!

  """Reads a single Movie that is related to this Nomination."""
  movie: Movie
  movieId: Int

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of NominatedPerson."""
  nominatedPeople(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominatedPersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominatedPersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominatedPeopleConnection!
  note: String
  winner: Boolean
}

"""
A condition to be used against Nomination object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input NominationCondition {
  """Checks for equality with the object’s awardId field."""
  awardId: Int

  """Checks for equality with the object’s categoryId field."""
  categoryId: Int

  """Checks for equality with the object’s categoryOrder field."""
  categoryOrder: Int

  """Checks for equality with the object’s editionId field."""
  editionId: Int

  """Checks for equality with the object’s extraInfo field."""
  extraInfo: String

  """Checks for equality with the object’s flagged field."""
  flagged: Boolean

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s movieId field."""
  movieId: Int

  """Checks for equality with the object’s note field."""
  note: String

  """Checks for equality with the object’s winner field."""
  winner: Boolean
}

"""
A filter to be used against Nomination object types. All fields are combined with a logical ‘and.’
"""
input NominationFilter {
  """Checks for all expressions in this list."""
  and: [NominationFilter!]

  """Filter by the object’s awardId field."""
  awardId: IntFilter

  """Filter by the object’s categoryId field."""
  categoryId: IntFilter

  """Filter by the object’s categoryOrder field."""
  categoryOrder: IntFilter

  """Filter by the object’s editionId field."""
  editionId: IntFilter

  """Filter by the object’s extraInfo field."""
  extraInfo: StringFilter

  """Filter by the object’s flagged field."""
  flagged: BooleanFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s movieId field."""
  movieId: IntFilter

  """Negates the expression."""
  not: NominationFilter

  """Filter by the object’s note field."""
  note: StringFilter

  """Checks for any expressions in this list."""
  or: [NominationFilter!]

  """Filter by the object’s winner field."""
  winner: BooleanFilter
}

"""An input for mutations affecting Nomination"""
input NominationInput {
  awardId: Int
  categoryId: Int
  categoryOrder: Int
  editionId: Int
  extraInfo: String
  flagged: Boolean
  id: Int
  movieId: Int
  note: String
  winner: Boolean
}

"""
Represents an update to a Nomination. Fields that are set will be updated.
"""
input NominationPatch {
  awardId: Int
  categoryId: Int
  categoryOrder: Int
  editionId: Int
  extraInfo: String
  flagged: Boolean
  id: Int
  movieId: Int
  note: String
  winner: Boolean
}

"""A connection to a list of Nomination values."""
type NominationsConnection {
  """
  A list of edges which contains the Nomination and cursor to aid in pagination.
  """
  edges: [NominationsEdge!]!

  """A list of Nomination objects."""
  nodes: [Nomination]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Nomination you could get from the connection."""
  totalCount: Int!
}

"""A Nomination edge in the connection."""
type NominationsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Nomination at the end of the edge."""
  node: Nomination
}

"""Methods to use when ordering Nomination."""
enum NominationsOrderBy {
  AWARD_BY_AWARD_ID__COUNTRY_ID_ASC
  AWARD_BY_AWARD_ID__COUNTRY_ID_DESC
  AWARD_BY_AWARD_ID__DESCRIPTION_ASC
  AWARD_BY_AWARD_ID__DESCRIPTION_DESC
  AWARD_BY_AWARD_ID__ID_ASC
  AWARD_BY_AWARD_ID__ID_DESC
  AWARD_BY_AWARD_ID__LINK_ASC
  AWARD_BY_AWARD_ID__LINK_DESC
  AWARD_BY_AWARD_ID__LOGO_ASC
  AWARD_BY_AWARD_ID__LOGO_DESC
  AWARD_BY_AWARD_ID__NAME_LONG_ASC
  AWARD_BY_AWARD_ID__NAME_LONG_DESC
  AWARD_BY_AWARD_ID__NAME_SHORT_ASC
  AWARD_BY_AWARD_ID__NAME_SHORT_DESC
  AWARD_ID_ASC
  AWARD_ID_DESC
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_ASC
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_DESC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_ASC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_DESC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_ASC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_DESC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_ASC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_DESC
  CATEGORY_BY_CATEGORY_ID__ID_ASC
  CATEGORY_BY_CATEGORY_ID__ID_DESC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_ASC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_DESC
  CATEGORY_BY_CATEGORY_ID__NAME_ASC
  CATEGORY_BY_CATEGORY_ID__NAME_DESC
  CATEGORY_BY_CATEGORY_ID__ORDER_ASC
  CATEGORY_BY_CATEGORY_ID__ORDER_DESC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_ASC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_DESC
  CATEGORY_ID_ASC
  CATEGORY_ID_DESC
  CATEGORY_ORDER_ASC
  CATEGORY_ORDER_DESC
  EDITION_BY_EDITION_ID__AWARD_ID_ASC
  EDITION_BY_EDITION_ID__AWARD_ID_DESC
  EDITION_BY_EDITION_ID__DATE_ASC
  EDITION_BY_EDITION_ID__DATE_DESC
  EDITION_BY_EDITION_ID__FLAG_ASC
  EDITION_BY_EDITION_ID__FLAG_DESC
  EDITION_BY_EDITION_ID__ID_ASC
  EDITION_BY_EDITION_ID__ID_DESC
  EDITION_BY_EDITION_ID__NAME_ASC
  EDITION_BY_EDITION_ID__NAME_DESC
  EDITION_BY_EDITION_ID__POSTER_ASC
  EDITION_BY_EDITION_ID__POSTER_DESC
  EDITION_BY_EDITION_ID__PUBLISH_ASC
  EDITION_BY_EDITION_ID__PUBLISH_DESC
  EDITION_BY_EDITION_ID__WIKIPEDIA_ASC
  EDITION_BY_EDITION_ID__WIKIPEDIA_DESC
  EDITION_ID_ASC
  EDITION_ID_DESC
  EXTRA_INFO_ASC
  EXTRA_INFO_DESC
  FLAGGED_ASC
  FLAGGED_DESC
  ID_ASC
  ID_DESC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_ASC
  MOVIE_BY_MOVIE_ID__BACKDROP_PATH_DESC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_ASC
  MOVIE_BY_MOVIE_ID__HOMEPAGE_DESC
  MOVIE_BY_MOVIE_ID__ID_ASC
  MOVIE_BY_MOVIE_ID__ID_DESC
  MOVIE_BY_MOVIE_ID__IMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__IMDB_ID_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_LANGUAGE_DESC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_ASC
  MOVIE_BY_MOVIE_ID__ORIGINAL_TITLE_DESC
  MOVIE_BY_MOVIE_ID__OVERVIEW_ASC
  MOVIE_BY_MOVIE_ID__OVERVIEW_DESC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_ASC
  MOVIE_BY_MOVIE_ID__POSTER_PATH_DESC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_ASC
  MOVIE_BY_MOVIE_ID__RELEASE_DATE_DESC
  MOVIE_BY_MOVIE_ID__RUNTIME_ASC
  MOVIE_BY_MOVIE_ID__RUNTIME_DESC
  MOVIE_BY_MOVIE_ID__TAGLINE_ASC
  MOVIE_BY_MOVIE_ID__TAGLINE_DESC
  MOVIE_BY_MOVIE_ID__TITLE_ASC
  MOVIE_BY_MOVIE_ID__TITLE_DESC
  MOVIE_BY_MOVIE_ID__TMDB_ID_ASC
  MOVIE_BY_MOVIE_ID__TMDB_ID_DESC
  MOVIE_ID_ASC
  MOVIE_ID_DESC
  NATURAL
  NOMINATED_PEOPLE_BY_NOMINATION_ID__COUNT_ASC
  NOMINATED_PEOPLE_BY_NOMINATION_ID__COUNT_DESC
  NOTE_ASC
  NOTE_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  WINNER_ASC
  WINNER_DESC
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, the cursor to continue."""
  endCursor: Cursor

  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: Cursor
}

"""A connection to a list of Person values."""
type PeopleConnection {
  """
  A list of edges which contains the Person and cursor to aid in pagination.
  """
  edges: [PeopleEdge!]!

  """A list of Person objects."""
  nodes: [Person]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Person you could get from the connection."""
  totalCount: Int!
}

"""A Person edge in the connection."""
type PeopleEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Person at the end of the edge."""
  node: Person
}

"""Methods to use when ordering Person."""
enum PeopleOrderBy {
  ALSO_KNOWN_AS_ASC
  ALSO_KNOWN_AS_DESC
  BIOGRAPHY_ASC
  BIOGRAPHY_DESC
  BIRTHDAY_ASC
  BIRTHDAY_DESC
  DEATHDAY_ASC
  DEATHDAY_DESC
  GENDER_ASC
  GENDER_DESC
  HOMEPAGE_ASC
  HOMEPAGE_DESC
  ID_ASC
  ID_DESC
  IMDB_ID_ASC
  IMDB_ID_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  NOMINATED_PEOPLE_BY_PERSON_ID__COUNT_ASC
  NOMINATED_PEOPLE_BY_PERSON_ID__COUNT_DESC
  PLACE_OF_BIRTH_ASC
  PLACE_OF_BIRTH_DESC
  POPULARITY_ASC
  POPULARITY_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  PROFILE_PATH_ASC
  PROFILE_PATH_DESC
  TMDB_ID_ASC
  TMDB_ID_DESC
}

type Person implements Node {
  alsoKnownAs: String
  biography: String
  birthday: Date
  deathday: Date
  gender: Int
  homepage: String
  id: Int!
  imdbId: String
  name: String

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of NominatedPerson."""
  nominatedPeople(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominatedPersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominatedPersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominatedPeopleConnection!
  placeOfBirth: String
  popularity: Float
  profilePath: String
  tmdbId: Int
}

"""
A condition to be used against Person object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input PersonCondition {
  """Checks for equality with the object’s alsoKnownAs field."""
  alsoKnownAs: String

  """Checks for equality with the object’s biography field."""
  biography: String

  """Checks for equality with the object’s birthday field."""
  birthday: Date

  """Checks for equality with the object’s deathday field."""
  deathday: Date

  """Checks for equality with the object’s gender field."""
  gender: Int

  """Checks for equality with the object’s homepage field."""
  homepage: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s imdbId field."""
  imdbId: String

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s placeOfBirth field."""
  placeOfBirth: String

  """Checks for equality with the object’s popularity field."""
  popularity: Float

  """Checks for equality with the object’s profilePath field."""
  profilePath: String

  """Checks for equality with the object’s tmdbId field."""
  tmdbId: Int
}

"""
A filter to be used against Person object types. All fields are combined with a logical ‘and.’
"""
input PersonFilter {
  """Filter by the object’s alsoKnownAs field."""
  alsoKnownAs: StringFilter

  """Checks for all expressions in this list."""
  and: [PersonFilter!]

  """Filter by the object’s biography field."""
  biography: StringFilter

  """Filter by the object’s birthday field."""
  birthday: DateFilter

  """Filter by the object’s deathday field."""
  deathday: DateFilter

  """Filter by the object’s gender field."""
  gender: IntFilter

  """Filter by the object’s homepage field."""
  homepage: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s imdbId field."""
  imdbId: StringFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: PersonFilter

  """Checks for any expressions in this list."""
  or: [PersonFilter!]

  """Filter by the object’s placeOfBirth field."""
  placeOfBirth: StringFilter

  """Filter by the object’s popularity field."""
  popularity: FloatFilter

  """Filter by the object’s profilePath field."""
  profilePath: StringFilter

  """Filter by the object’s tmdbId field."""
  tmdbId: IntFilter
}

"""An input for mutations affecting Person"""
input PersonInput {
  alsoKnownAs: String
  biography: String
  birthday: Date
  deathday: Date
  gender: Int
  homepage: String
  id: Int
  imdbId: String
  name: String
  placeOfBirth: String
  popularity: Float
  profilePath: String
  tmdbId: Int
}

"""
Represents an update to a Person. Fields that are set will be updated.
"""
input PersonPatch {
  alsoKnownAs: String
  biography: String
  birthday: Date
  deathday: Date
  gender: Int
  homepage: String
  id: Int
  imdbId: String
  name: String
  placeOfBirth: String
  popularity: Float
  profilePath: String
  tmdbId: Int
}

type Prize {
  """Reads a single Award that is related to this Prize."""
  award: Award
  awardId: Int

  """Reads a single Category that is related to this Prize."""
  category: Category
  categoryId: Int
  description: String
  display: String
  id: Int!
  important: Boolean
  name: String

  """Reads and enables pagination through a set of NominatedPerson."""
  nominatedPeople(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominatedPersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominatedPersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominatedPeopleConnection!
  order: Int
}

"""
A condition to be used against Prize object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input PrizeCondition {
  """Checks for equality with the object’s awardId field."""
  awardId: Int

  """Checks for equality with the object’s categoryId field."""
  categoryId: Int

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s display field."""
  display: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s important field."""
  important: Boolean

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s order field."""
  order: Int
}

"""
A filter to be used against Prize object types. All fields are combined with a logical ‘and.’
"""
input PrizeFilter {
  """Checks for all expressions in this list."""
  and: [PrizeFilter!]

  """Filter by the object’s awardId field."""
  awardId: IntFilter

  """Filter by the object’s categoryId field."""
  categoryId: IntFilter

  """Filter by the object’s description field."""
  description: StringFilter

  """Filter by the object’s display field."""
  display: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Filter by the object’s important field."""
  important: BooleanFilter

  """Filter by the object’s name field."""
  name: StringFilter

  """Negates the expression."""
  not: PrizeFilter

  """Checks for any expressions in this list."""
  or: [PrizeFilter!]

  """Filter by the object’s order field."""
  order: IntFilter
}

"""An input for mutations affecting Prize"""
input PrizeInput {
  awardId: Int
  categoryId: Int
  description: String
  display: String
  id: Int
  important: Boolean
  name: String
  order: Int
}

"""
Represents an update to a Prize. Fields that are set will be updated.
"""
input PrizePatch {
  awardId: Int
  categoryId: Int
  description: String
  display: String
  id: Int
  important: Boolean
  name: String
  order: Int
}

"""A connection to a list of Prize values."""
type PrizesConnection {
  """
  A list of edges which contains the Prize and cursor to aid in pagination.
  """
  edges: [PrizesEdge!]!

  """A list of Prize objects."""
  nodes: [Prize]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Prize you could get from the connection."""
  totalCount: Int!
}

"""A Prize edge in the connection."""
type PrizesEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Prize at the end of the edge."""
  node: Prize
}

"""Methods to use when ordering Prize."""
enum PrizesOrderBy {
  AWARD_BY_AWARD_ID__COUNTRY_ID_ASC
  AWARD_BY_AWARD_ID__COUNTRY_ID_DESC
  AWARD_BY_AWARD_ID__DESCRIPTION_ASC
  AWARD_BY_AWARD_ID__DESCRIPTION_DESC
  AWARD_BY_AWARD_ID__ID_ASC
  AWARD_BY_AWARD_ID__ID_DESC
  AWARD_BY_AWARD_ID__LINK_ASC
  AWARD_BY_AWARD_ID__LINK_DESC
  AWARD_BY_AWARD_ID__LOGO_ASC
  AWARD_BY_AWARD_ID__LOGO_DESC
  AWARD_BY_AWARD_ID__NAME_LONG_ASC
  AWARD_BY_AWARD_ID__NAME_LONG_DESC
  AWARD_BY_AWARD_ID__NAME_SHORT_ASC
  AWARD_BY_AWARD_ID__NAME_SHORT_DESC
  AWARD_ID_ASC
  AWARD_ID_DESC
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_ASC
  CATEGORY_BY_CATEGORY_ID__AWARD_ID_DESC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_ASC
  CATEGORY_BY_CATEGORY_ID__CREDIT_SEARCH_KEYWORDS_DESC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_ASC
  CATEGORY_BY_CATEGORY_ID__DESCRIPTION_DESC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_ASC
  CATEGORY_BY_CATEGORY_ID__DISPLAY_DESC
  CATEGORY_BY_CATEGORY_ID__ID_ASC
  CATEGORY_BY_CATEGORY_ID__ID_DESC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_ASC
  CATEGORY_BY_CATEGORY_ID__IMPORTANT_DESC
  CATEGORY_BY_CATEGORY_ID__NAME_ASC
  CATEGORY_BY_CATEGORY_ID__NAME_DESC
  CATEGORY_BY_CATEGORY_ID__ORDER_ASC
  CATEGORY_BY_CATEGORY_ID__ORDER_DESC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_ASC
  CATEGORY_BY_CATEGORY_ID__PARENT_ID_DESC
  CATEGORY_ID_ASC
  CATEGORY_ID_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  DISPLAY_ASC
  DISPLAY_DESC
  ID_ASC
  ID_DESC
  IMPORTANT_ASC
  IMPORTANT_DESC
  NAME_ASC
  NAME_DESC
  NATURAL
  NOMINATED_PEOPLE_BY_PRIZE_ID__COUNT_ASC
  NOMINATED_PEOPLE_BY_PRIZE_ID__COUNT_DESC
  ORDER_ASC
  ORDER_DESC
}

"""The root query type which gives access points into the data universe."""
type Query implements Node {
  award(id: Int!): Award
  awardByLink(link: String!): Award
  awardByNameShort(nameShort: String!): Award

  """Reads a single Award using its globally unique ID."""
  awardByNodeId(
    """The globally unique ID to be used in selecting a single Award."""
    nodeId: ID!
  ): Award

  """Reads and enables pagination through a set of Award."""
  awards(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: AwardCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: AwardFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Award."""
    orderBy: [AwardsOrderBy!] = [PRIMARY_KEY_ASC]
  ): AwardsConnection

  """Reads and enables pagination through a set of Category."""
  categories(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: CategoryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: CategoryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = [PRIMARY_KEY_ASC]
  ): CategoriesConnection
  category(awardId: Int!, id: Int!): Category
  categoryById(id: Int!): Category

  """Reads a single Category using its globally unique ID."""
  categoryByNodeId(
    """The globally unique ID to be used in selecting a single Category."""
    nodeId: ID!
  ): Category

  """Reads and enables pagination through a set of Country."""
  countries(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: CountryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: CountryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Country."""
    orderBy: [CountriesOrderBy!] = [PRIMARY_KEY_ASC]
  ): CountriesConnection
  country(id: Int!): Country
  countryByCode(code: String!): Country

  """Reads a single Country using its globally unique ID."""
  countryByNodeId(
    """The globally unique ID to be used in selecting a single Country."""
    nodeId: ID!
  ): Country
  department(id: Int!): Department

  """Reads a single Department using its globally unique ID."""
  departmentByNodeId(
    """
    The globally unique ID to be used in selecting a single Department.
    """
    nodeId: ID!
  ): Department

  """Reads and enables pagination through a set of Department."""
  departments(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: DepartmentCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: DepartmentFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Department."""
    orderBy: [DepartmentsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DepartmentsConnection
  edition(id: Int!): Edition
  editionAdminNote(id: Int!): EditionAdminNote

  """Reads a single EditionAdminNote using its globally unique ID."""
  editionAdminNoteByNodeId(
    """
    The globally unique ID to be used in selecting a single EditionAdminNote.
    """
    nodeId: ID!
  ): EditionAdminNote

  """Reads and enables pagination through a set of EditionAdminNote."""
  editionAdminNotes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: EditionAdminNoteCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: EditionAdminNoteFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = [PRIMARY_KEY_ASC]
  ): EditionAdminNotesConnection

  """Reads a single Edition using its globally unique ID."""
  editionByNodeId(
    """The globally unique ID to be used in selecting a single Edition."""
    nodeId: ID!
  ): Edition

  """Reads and enables pagination through a set of Edition."""
  editions(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: EditionCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: EditionFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Edition."""
    orderBy: [EditionsOrderBy!] = [PRIMARY_KEY_ASC]
  ): EditionsConnection
  genre(id: Int!): Genre

  """Reads a single Genre using its globally unique ID."""
  genreByNodeId(
    """The globally unique ID to be used in selecting a single Genre."""
    nodeId: ID!
  ): Genre

  """Reads and enables pagination through a set of Genre."""
  genres(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: GenreCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: GenreFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Genre."""
    orderBy: [GenresOrderBy!] = [PRIMARY_KEY_ASC]
  ): GenresConnection
  job(id: Int!): Job

  """Reads a single Job using its globally unique ID."""
  jobByNodeId(
    """The globally unique ID to be used in selecting a single Job."""
    nodeId: ID!
  ): Job

  """Reads and enables pagination through a set of Job."""
  jobs(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: JobCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: JobFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Job."""
    orderBy: [JobsOrderBy!] = [PRIMARY_KEY_ASC]
  ): JobsConnection
  movie(id: Int!): Movie
  movieBackdrop(id: Int!): MovieBackdrop

  """Reads a single MovieBackdrop using its globally unique ID."""
  movieBackdropByNodeId(
    """
    The globally unique ID to be used in selecting a single MovieBackdrop.
    """
    nodeId: ID!
  ): MovieBackdrop

  """Reads and enables pagination through a set of MovieBackdrop."""
  movieBackdrops(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieBackdropCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieBackdropFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieBackdrop."""
    orderBy: [MovieBackdropsOrderBy!] = [PRIMARY_KEY_ASC]
  ): MovieBackdropsConnection

  """Reads a single Movie using its globally unique ID."""
  movieByNodeId(
    """The globally unique ID to be used in selecting a single Movie."""
    nodeId: ID!
  ): Movie

  """Reads and enables pagination through a set of MovieCountry."""
  movieCountries(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieCountryCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieCountryFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieCountry."""
    orderBy: [MovieCountriesOrderBy!] = [NATURAL]
  ): MovieCountriesConnection

  """Reads and enables pagination through a set of MovieGenre."""
  movieGenres(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieGenreCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieGenreFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MovieGenre."""
    orderBy: [MovieGenresOrderBy!] = [NATURAL]
  ): MovieGenresConnection
  moviePoster(id: Int!): MoviePoster

  """Reads a single MoviePoster using its globally unique ID."""
  moviePosterByNodeId(
    """
    The globally unique ID to be used in selecting a single MoviePoster.
    """
    nodeId: ID!
  ): MoviePoster

  """Reads and enables pagination through a set of MoviePoster."""
  moviePosters(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MoviePosterCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MoviePosterFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering MoviePoster."""
    orderBy: [MoviePostersOrderBy!] = [PRIMARY_KEY_ASC]
  ): MoviePostersConnection

  """Reads and enables pagination through a set of Movie."""
  movies(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: MovieCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: MovieFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Movie."""
    orderBy: [MoviesOrderBy!] = [PRIMARY_KEY_ASC]
  ): MoviesConnection

  """Fetches an object given its globally unique ID."""
  node(
    """The globally unique ID."""
    nodeId: ID!
  ): Node

  """
  The root query type must be a Node to work well with Relay 1 mutations. This just resolves to query.
  """
  nodeId: ID!

  """Reads and enables pagination through a set of NominatedPerson."""
  nominatedPeople(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominatedPersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominatedPersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominatedPeopleConnection
  nominatedPerson(id: Int!): NominatedPerson

  """Reads a single NominatedPerson using its globally unique ID."""
  nominatedPersonByNodeId(
    """
    The globally unique ID to be used in selecting a single NominatedPerson.
    """
    nodeId: ID!
  ): NominatedPerson
  nomination(id: Int!): Nomination

  """Reads a single Nomination using its globally unique ID."""
  nominationByNodeId(
    """
    The globally unique ID to be used in selecting a single Nomination.
    """
    nodeId: ID!
  ): Nomination

  """Reads and enables pagination through a set of Nomination."""
  nominations(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: NominationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: NominationFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): NominationsConnection

  """Reads and enables pagination through a set of Person."""
  people(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PersonCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: PersonFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Person."""
    orderBy: [PeopleOrderBy!] = [PRIMARY_KEY_ASC]
  ): PeopleConnection
  person(id: Int!): Person

  """Reads a single Person using its globally unique ID."""
  personByNodeId(
    """The globally unique ID to be used in selecting a single Person."""
    nodeId: ID!
  ): Person
  prizeById(id: Int!): Prize

  """Reads and enables pagination through a set of Prize."""
  prizes(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PrizeCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: PrizeFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = [NATURAL]
  ): PrizesConnection

  """
  Exposes the root query type nested one level down. This is helpful for Relay 1
  which can only query top level fields if they are in a particular form.
  """
  query: Query!
  user(id: Int!): User
  userByEmail(email: String!): User

  """Reads a single User using its globally unique ID."""
  userByNodeId(
    """The globally unique ID to be used in selecting a single User."""
    nodeId: ID!
  ): User

  """Reads and enables pagination through a set of User."""
  users(
    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: UserCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: UserFilter

    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """The method to use when ordering User."""
    orderBy: [UsersOrderBy!] = [PRIMARY_KEY_ASC]
  ): UsersConnection
}

"""
A filter to be used against String fields. All fields are combined with a logical ‘and.’
"""
input StringFilter {
  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: String

  """Ends with the specified string (case-sensitive)."""
  endsWith: String

  """Ends with the specified string (case-insensitive)."""
  endsWithInsensitive: String

  """Equal to the specified value."""
  equalTo: String

  """Greater than the specified value."""
  greaterThan: String

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: String

  """Included in the specified list."""
  in: [String!]

  """Contains the specified string (case-sensitive)."""
  includes: String

  """Contains the specified string (case-insensitive)."""
  includesInsensitive: String

  """
  Is null (if true is specified) or is not null (if false is specified).
  """
  isNull: Boolean

  """Less than the specified value."""
  lessThan: String

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: String

  """
  Matches the specified pattern (case-sensitive). An underscore (_) matches any
  single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  like: String

  """
  Matches the specified pattern (case-insensitive). An underscore (_) matches
  any single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  likeInsensitive: String

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: String

  """Does not end with the specified string (case-sensitive)."""
  notEndsWith: String

  """Does not end with the specified string (case-insensitive)."""
  notEndsWithInsensitive: String

  """Not equal to the specified value."""
  notEqualTo: String

  """Not included in the specified list."""
  notIn: [String!]

  """Does not contain the specified string (case-sensitive)."""
  notIncludes: String

  """Does not contain the specified string (case-insensitive)."""
  notIncludesInsensitive: String

  """
  Does not match the specified pattern (case-sensitive). An underscore (_)
  matches any single character; a percent sign (%) matches any sequence of zero
  or more characters.
  """
  notLike: String

  """
  Does not match the specified pattern (case-insensitive). An underscore (_)
  matches any single character; a percent sign (%) matches any sequence of zero
  or more characters.
  """
  notLikeInsensitive: String

  """
  Does not match the specified pattern using the SQL standard's definition of a regular expression.
  """
  notSimilarTo: String

  """Does not start with the specified string (case-sensitive)."""
  notStartsWith: String

  """Does not start with the specified string (case-insensitive)."""
  notStartsWithInsensitive: String

  """
  Matches the specified pattern using the SQL standard's definition of a regular expression.
  """
  similarTo: String

  """Starts with the specified string (case-sensitive)."""
  startsWith: String

  """Starts with the specified string (case-insensitive)."""
  startsWithInsensitive: String
}

"""All input for the updateAwardByLink mutation."""
input UpdateAwardByLinkInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  link: String!

  """
  An object where the defined keys will be set on the Award being updated.
  """
  patch: AwardPatch!
}

"""All input for the updateAwardByNameShort mutation."""
input UpdateAwardByNameShortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  nameShort: String!

  """
  An object where the defined keys will be set on the Award being updated.
  """
  patch: AwardPatch!
}

"""All input for the updateAwardByNodeId mutation."""
input UpdateAwardByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Award to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Award being updated.
  """
  patch: AwardPatch!
}

"""All input for the updateAward mutation."""
input UpdateAwardInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Award being updated.
  """
  patch: AwardPatch!
}

"""The output of our update Award mutation."""
type UpdateAwardPayload {
  """The Award that was updated by this mutation."""
  award: Award

  """An edge for our Award. May be used by Relay 1."""
  awardEdge(
    """The method to use when ordering Award."""
    orderBy: [AwardsOrderBy!] = PRIMARY_KEY_ASC
  ): AwardsEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Country that is related to this Award."""
  country: Country

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateCategoryById mutation."""
input UpdateCategoryByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Category being updated.
  """
  patch: CategoryPatch!
}

"""All input for the updateCategoryByNodeId mutation."""
input UpdateCategoryByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Category to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Category being updated.
  """
  patch: CategoryPatch!
}

"""All input for the updateCategory mutation."""
input UpdateCategoryInput {
  awardId: Int!

  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Category being updated.
  """
  patch: CategoryPatch!
}

"""The output of our update Category mutation."""
type UpdateCategoryPayload {
  """Reads a single Award that is related to this Category."""
  award: Award

  """The Category that was updated by this mutation."""
  category: Category

  """Reads a single Category that is related to this Category."""
  categoryByAwardIdAndParentId: Category

  """An edge for our Category. May be used by Relay 1."""
  categoryEdge(
    """The method to use when ordering Category."""
    orderBy: [CategoriesOrderBy!] = PRIMARY_KEY_ASC
  ): CategoriesEdge

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateCountryByCode mutation."""
input UpdateCountryByCodeInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  code: String!

  """
  An object where the defined keys will be set on the Country being updated.
  """
  patch: CountryPatch!
}

"""All input for the updateCountryByNodeId mutation."""
input UpdateCountryByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Country to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Country being updated.
  """
  patch: CountryPatch!
}

"""All input for the updateCountry mutation."""
input UpdateCountryInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Country being updated.
  """
  patch: CountryPatch!
}

"""The output of our update Country mutation."""
type UpdateCountryPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Country that was updated by this mutation."""
  country: Country

  """An edge for our Country. May be used by Relay 1."""
  countryEdge(
    """The method to use when ordering Country."""
    orderBy: [CountriesOrderBy!] = PRIMARY_KEY_ASC
  ): CountriesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateDepartmentByNodeId mutation."""
input UpdateDepartmentByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Department to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Department being updated.
  """
  patch: DepartmentPatch!
}

"""All input for the updateDepartment mutation."""
input UpdateDepartmentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Department being updated.
  """
  patch: DepartmentPatch!
}

"""The output of our update Department mutation."""
type UpdateDepartmentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Department that was updated by this mutation."""
  department: Department

  """An edge for our Department. May be used by Relay 1."""
  departmentEdge(
    """The method to use when ordering Department."""
    orderBy: [DepartmentsOrderBy!] = PRIMARY_KEY_ASC
  ): DepartmentsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateEditionAdminNoteByNodeId mutation."""
input UpdateEditionAdminNoteByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single EditionAdminNote to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the EditionAdminNote being updated.
  """
  patch: EditionAdminNotePatch!
}

"""All input for the updateEditionAdminNote mutation."""
input UpdateEditionAdminNoteInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the EditionAdminNote being updated.
  """
  patch: EditionAdminNotePatch!
}

"""The output of our update EditionAdminNote mutation."""
type UpdateEditionAdminNotePayload {
  """Reads a single Category that is related to this EditionAdminNote."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Edition that is related to this EditionAdminNote."""
  edition: Edition

  """The EditionAdminNote that was updated by this mutation."""
  editionAdminNote: EditionAdminNote

  """An edge for our EditionAdminNote. May be used by Relay 1."""
  editionAdminNoteEdge(
    """The method to use when ordering EditionAdminNote."""
    orderBy: [EditionAdminNotesOrderBy!] = PRIMARY_KEY_ASC
  ): EditionAdminNotesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateEditionByNodeId mutation."""
input UpdateEditionByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Edition to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Edition being updated.
  """
  patch: EditionPatch!
}

"""All input for the updateEdition mutation."""
input UpdateEditionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Edition being updated.
  """
  patch: EditionPatch!
}

"""The output of our update Edition mutation."""
type UpdateEditionPayload {
  """Reads a single Award that is related to this Edition."""
  award: Award

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Edition that was updated by this mutation."""
  edition: Edition

  """An edge for our Edition. May be used by Relay 1."""
  editionEdge(
    """The method to use when ordering Edition."""
    orderBy: [EditionsOrderBy!] = PRIMARY_KEY_ASC
  ): EditionsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateGenreByNodeId mutation."""
input UpdateGenreByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Genre to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Genre being updated.
  """
  patch: GenrePatch!
}

"""All input for the updateGenre mutation."""
input UpdateGenreInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Genre being updated.
  """
  patch: GenrePatch!
}

"""The output of our update Genre mutation."""
type UpdateGenrePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Genre that was updated by this mutation."""
  genre: Genre

  """An edge for our Genre. May be used by Relay 1."""
  genreEdge(
    """The method to use when ordering Genre."""
    orderBy: [GenresOrderBy!] = PRIMARY_KEY_ASC
  ): GenresEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateJobByNodeId mutation."""
input UpdateJobByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Job to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Job being updated.
  """
  patch: JobPatch!
}

"""All input for the updateJob mutation."""
input UpdateJobInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Job being updated.
  """
  patch: JobPatch!
}

"""The output of our update Job mutation."""
type UpdateJobPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Department that is related to this Job."""
  department: Department

  """The Job that was updated by this mutation."""
  job: Job

  """An edge for our Job. May be used by Relay 1."""
  jobEdge(
    """The method to use when ordering Job."""
    orderBy: [JobsOrderBy!] = PRIMARY_KEY_ASC
  ): JobsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateMovieBackdropByNodeId mutation."""
input UpdateMovieBackdropByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single MovieBackdrop to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the MovieBackdrop being updated.
  """
  patch: MovieBackdropPatch!
}

"""All input for the updateMovieBackdrop mutation."""
input UpdateMovieBackdropInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the MovieBackdrop being updated.
  """
  patch: MovieBackdropPatch!
}

"""The output of our update MovieBackdrop mutation."""
type UpdateMovieBackdropPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Movie that is related to this MovieBackdrop."""
  movie: Movie

  """The MovieBackdrop that was updated by this mutation."""
  movieBackdrop: MovieBackdrop

  """An edge for our MovieBackdrop. May be used by Relay 1."""
  movieBackdropEdge(
    """The method to use when ordering MovieBackdrop."""
    orderBy: [MovieBackdropsOrderBy!] = PRIMARY_KEY_ASC
  ): MovieBackdropsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateMovieByNodeId mutation."""
input UpdateMovieByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Movie to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Movie being updated.
  """
  patch: MoviePatch!
}

"""All input for the updateMovie mutation."""
input UpdateMovieInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Movie being updated.
  """
  patch: MoviePatch!
}

"""The output of our update Movie mutation."""
type UpdateMoviePayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Movie that was updated by this mutation."""
  movie: Movie

  """An edge for our Movie. May be used by Relay 1."""
  movieEdge(
    """The method to use when ordering Movie."""
    orderBy: [MoviesOrderBy!] = PRIMARY_KEY_ASC
  ): MoviesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateMoviePosterByNodeId mutation."""
input UpdateMoviePosterByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single MoviePoster to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the MoviePoster being updated.
  """
  patch: MoviePosterPatch!
}

"""All input for the updateMoviePoster mutation."""
input UpdateMoviePosterInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the MoviePoster being updated.
  """
  patch: MoviePosterPatch!
}

"""The output of our update MoviePoster mutation."""
type UpdateMoviePosterPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Movie that is related to this MoviePoster."""
  movie: Movie

  """The MoviePoster that was updated by this mutation."""
  moviePoster: MoviePoster

  """An edge for our MoviePoster. May be used by Relay 1."""
  moviePosterEdge(
    """The method to use when ordering MoviePoster."""
    orderBy: [MoviePostersOrderBy!] = PRIMARY_KEY_ASC
  ): MoviePostersEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateNominatedPersonByNodeId mutation."""
input UpdateNominatedPersonByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single NominatedPerson to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the NominatedPerson being updated.
  """
  patch: NominatedPersonPatch!
}

"""All input for the updateNominatedPerson mutation."""
input UpdateNominatedPersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the NominatedPerson being updated.
  """
  patch: NominatedPersonPatch!
}

"""The output of our update NominatedPerson mutation."""
type UpdateNominatedPersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Job that is related to this NominatedPerson."""
  job: Job

  """The NominatedPerson that was updated by this mutation."""
  nominatedPerson: NominatedPerson

  """An edge for our NominatedPerson. May be used by Relay 1."""
  nominatedPersonEdge(
    """The method to use when ordering NominatedPerson."""
    orderBy: [NominatedPeopleOrderBy!] = PRIMARY_KEY_ASC
  ): NominatedPeopleEdge

  """Reads a single Nomination that is related to this NominatedPerson."""
  nomination: Nomination

  """Reads a single Person that is related to this NominatedPerson."""
  person: Person

  """Reads a single Prize that is related to this NominatedPerson."""
  prize: Prize

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateNominationByNodeId mutation."""
input UpdateNominationByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Nomination to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Nomination being updated.
  """
  patch: NominationPatch!
}

"""All input for the updateNomination mutation."""
input UpdateNominationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Nomination being updated.
  """
  patch: NominationPatch!
}

"""The output of our update Nomination mutation."""
type UpdateNominationPayload {
  """Reads a single Award that is related to this Nomination."""
  award: Award

  """Reads a single Category that is related to this Nomination."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """Reads a single Edition that is related to this Nomination."""
  edition: Edition

  """Reads a single Movie that is related to this Nomination."""
  movie: Movie

  """The Nomination that was updated by this mutation."""
  nomination: Nomination

  """An edge for our Nomination. May be used by Relay 1."""
  nominationEdge(
    """The method to use when ordering Nomination."""
    orderBy: [NominationsOrderBy!] = PRIMARY_KEY_ASC
  ): NominationsEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updatePersonByNodeId mutation."""
input UpdatePersonByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Person to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Person being updated.
  """
  patch: PersonPatch!
}

"""All input for the updatePerson mutation."""
input UpdatePersonInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Person being updated.
  """
  patch: PersonPatch!
}

"""The output of our update Person mutation."""
type UpdatePersonPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Person that was updated by this mutation."""
  person: Person

  """An edge for our Person. May be used by Relay 1."""
  personEdge(
    """The method to use when ordering Person."""
    orderBy: [PeopleOrderBy!] = PRIMARY_KEY_ASC
  ): PeopleEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updatePrizeById mutation."""
input UpdatePrizeByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the Prize being updated.
  """
  patch: PrizePatch!
}

"""The output of our update Prize mutation."""
type UpdatePrizePayload {
  """Reads a single Award that is related to this Prize."""
  award: Award

  """Reads a single Category that is related to this Prize."""
  category: Category

  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Prize that was updated by this mutation."""
  prize: Prize

  """An edge for our Prize. May be used by Relay 1."""
  prizeEdge(
    """The method to use when ordering Prize."""
    orderBy: [PrizesOrderBy!] = NATURAL
  ): PrizesEdge

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query
}

"""All input for the updateUserByEmail mutation."""
input UpdateUserByEmailInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  email: String!

  """
  An object where the defined keys will be set on the User being updated.
  """
  patch: UserPatch!
}

"""All input for the updateUserByNodeId mutation."""
input UpdateUserByNodeIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single User to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the User being updated.
  """
  patch: UserPatch!
}

"""All input for the updateUser mutation."""
input UpdateUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!

  """
  An object where the defined keys will be set on the User being updated.
  """
  patch: UserPatch!
}

"""The output of our update User mutation."""
type UpdateUserPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """The User that was updated by this mutation."""
  user: User

  """An edge for our User. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering User."""
    orderBy: [UsersOrderBy!] = PRIMARY_KEY_ASC
  ): UsersEdge
}

type User implements Node {
  admin: Boolean!
  displayName: String
  email: String!
  id: Int!

  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  registeredOn: Datetime!
}

"""
A condition to be used against User object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input UserCondition {
  """Checks for equality with the object’s admin field."""
  admin: Boolean

  """Checks for equality with the object’s displayName field."""
  displayName: String

  """Checks for equality with the object’s email field."""
  email: String

  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s registeredOn field."""
  registeredOn: Datetime
}

"""
A filter to be used against User object types. All fields are combined with a logical ‘and.’
"""
input UserFilter {
  """Filter by the object’s admin field."""
  admin: BooleanFilter

  """Checks for all expressions in this list."""
  and: [UserFilter!]

  """Filter by the object’s displayName field."""
  displayName: StringFilter

  """Filter by the object’s email field."""
  email: StringFilter

  """Filter by the object’s id field."""
  id: IntFilter

  """Negates the expression."""
  not: UserFilter

  """Checks for any expressions in this list."""
  or: [UserFilter!]

  """Filter by the object’s registeredOn field."""
  registeredOn: DatetimeFilter
}

"""An input for mutations affecting User"""
input UserInput {
  admin: Boolean!
  displayName: String
  email: String!
  id: Int
  registeredOn: Datetime!
}

"""Represents an update to a User. Fields that are set will be updated."""
input UserPatch {
  admin: Boolean
  displayName: String
  email: String
  id: Int
  registeredOn: Datetime
}

"""A connection to a list of User values."""
type UsersConnection {
  """
  A list of edges which contains the User and cursor to aid in pagination.
  """
  edges: [UsersEdge!]!

  """A list of User objects."""
  nodes: [User]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* User you could get from the connection."""
  totalCount: Int!
}

"""A User edge in the connection."""
type UsersEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The User at the end of the edge."""
  node: User
}

"""Methods to use when ordering User."""
enum UsersOrderBy {
  ADMIN_ASC
  ADMIN_DESC
  DISPLAY_NAME_ASC
  DISPLAY_NAME_DESC
  EMAIL_ASC
  EMAIL_DESC
  ID_ASC
  ID_DESC
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  REGISTERED_ON_ASC
  REGISTERED_ON_DESC
}

`;
