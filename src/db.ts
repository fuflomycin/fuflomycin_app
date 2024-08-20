import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 */
export interface Drug {
  id: string; // drug id
  section?: string; // drug section
  title: string; // main name
  photo?: string; // photo filename
  gallery?: string[]; // photos fienames
  other?: string[]; // other names
  producer?: string; // producer of drug
  source?: string; // source with info
  label: 'red' | 'orange' | 'gold' | 'green' | 'gray'; // color label for drug
  contents: string; // HTML content
  otherstr?: string; // other name in string
  index: string; // title and other names for searching
}

/**
 * Constants
 */
const STORAGE_KEY = '@drugs';

/**
 *
 * Get drugs data from local async storage
 * ---------------------------------------
 *
 * @param key Async storage keys with data
 *
 * @returns drugs array
 *
 */
export const getDataFromStorage = async (
  key: string = STORAGE_KEY,
): Promise<Drug[] | null> => {
  // console.log('Try get data from storage...');
  try {
    const drugs = await AsyncStorage.getItem(key);
    if (drugs !== null) {
      // console.log('Data getted', drugs);
      const result = JSON.parse(drugs);
      result.sort((a: Drug, b: Drug) => {
        if (a.title.toLocaleUpperCase() > b.title.toLocaleUpperCase()) return 1;
        if (a.title.toLocaleUpperCase() < b.title.toLocaleUpperCase())
          return -1;
        return 0;
      });

      return result;
    } else {
      // console.log('No drugs in async storage');
      return null;
    }
  } catch (e) {
    // error reading value
    // console.log('Async storage error');
    return null;
  }
};

/**
 *
 * Save drugs array to local async storage
 * ---------------------------------------
 *
 * @param data data for save
 * @param key storage key
 *
 * @returns result of operation
 *
 */
export const saveDataToStorage = async (
  data: Drug[] = [],
  key: string = STORAGE_KEY,
): Promise<boolean> => {
  // console.log('Try save data to storage...');
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    // console.log('Saved');
    return true;
  } catch (e) {
    // console.log('Saving error');
    return false;
  }
};

/**
 *
 * Get drugs data from remote github url
 * -------------------------------------
 *
 * @param urls array with data urls
 *
 * @returns drugs array
 *
 */
export const getDataFromGithub = async (): Promise<Drug[] | null> => {
  //
  const HOMEOPATHY_URL =
    'https://fuflomycin.github.io/fuflomycin/homeopathy.json';
  const RSP_URL = 'https://fuflomycin.github.io/fuflomycin/rsp.json';
  const FK_URL = 'https://fuflomycin.github.io/fuflomycin/fk.json';

  // console.log('Try get data fron Github...');
  let result: Drug[] = [];

  const rawHomeopathy = await fetch(HOMEOPATHY_URL);
  const homeopathy = await rawHomeopathy.json();
  for (let i in homeopathy) result.push({i, ...homeopathy[i]});

  const rawRsp = await fetch(RSP_URL);
  const rsp = await rawRsp.json();
  for (let i in rsp) result.push({i, ...rsp[i]});

  const rawFk = await fetch(FK_URL);
  const fk = await rawFk.json();
  for (let i in fk) result.push({i, ...fk[i]});

  // console.log(...tmp);

  //
  // console.log('res', result);
  //
  for (let i in result) {
    result[i].index = (
      result[i].title +
      ', ' +
      result[i].other?.join(', ')
    ).toLocaleUpperCase();
    result[i].otherstr = result[i].other?.join(', ');
  }

  //
  result.sort((a: Drug, b: Drug) => {
    if (a.title.toLocaleUpperCase() > b.title.toLocaleUpperCase()) return 1;
    if (a.title.toLocaleUpperCase() < b.title.toLocaleUpperCase()) return -1;
    return 0;
  });

  return result;
};
