import { Course } from '../model/course';

/** Append firebase document id to returned object array */
export function convertSnaps<T>(snaps): T[] {
  return <T[]> snaps.map(snap => {
    return {
      id: snap.payload.doc.id,
      ...snap.payload.doc.data() as Object
    }
  });
}
