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
  label: 'red' | 'yellow' | 'green' | 'gray';
  contents: string;
}

export default Drug;
