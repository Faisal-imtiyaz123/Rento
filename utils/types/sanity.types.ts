

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type AmenitiesList = {
  _id: string
  _type: 'amenitiesList'
  _createdAt: string
  _updatedAt: string
  _rev: string
  amenityName?: string
}

export type Properties = {
  _id: string
  _type: 'properties'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  area?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    areaName?: string
  }
  location?: Geopoint
  propertyType?: Array<string>
  minPrice?: string
  amenities?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    amenityName?: string
  }>
  address?: string
  rooms?: Array<{
    roomType?:
      | 'pgB1'
      | 'pgB2'
      | 'pgB3'
      | 'hostelB1'
      | 'hostelB2'
      | 'hostelB3'
      | 'flatB1'
      | 'flatB2'
      | 'flatB3'
      | 'rkB1'
      | 'rkB2'
      | 'rkB3'
    floorNo?: number
    roomNo?: number
    price?: number
    discountedPrice?: number
    specialDiscount?: {
      discount?: number
      specialDiscountReason?: 'completeProfile'
    }
    images?: Array<{
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
      _key: string
    }>
    _type: 'room'
    _key: string
  }>
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type AreasList = {
  _id: string
  _type: 'areasList'
  _createdAt: string
  _updatedAt: string
  _rev: string
  areaName?: string
}

export type Colleges = {
  _id: string
  _type: 'colleges'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  campus?: 'northCampus' | 'southCampus' | 'offCampus'
  location?: Geopoint
  majorAreas?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'areasList'
  }>
  properties?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'properties'
  }>
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Slug
  | AmenitiesList
  | Properties
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | AreasList
  | Colleges
  | Geopoint
export declare const internalGroqTypeReferenceTo: unique symbol
