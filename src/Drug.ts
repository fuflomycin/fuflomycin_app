/**
 *
 */
interface Drug {
  id: string;
  section?: string;
  title: string;
  photo?: string;
  other?: string[];
  producer?: string;
  source?: string;
  label: 'red' | 'orange' | 'gold' | 'green' | 'gray';
  contents: string;
  index: string;
}

export default Drug;
