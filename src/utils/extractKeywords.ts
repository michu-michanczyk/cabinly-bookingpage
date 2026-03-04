import type { Cabin } from '../types/cabin';

/**
 * Extracts meaningful keywords from cabin data for the location ticker
 */
export function extractKeywords(cabin: Cabin): string[] {
  const keywords = new Set<string>();

  // Extract from title (split and filter common words)
  const titleWords = cabin.title
    .split(/\s+/)
    .filter(word =>
      word.length > 3 &&
      !['home', 'the', 'and', 'with', 'for'].includes(word.toLowerCase())
    );
  titleWords.forEach(word => keywords.add(word));

  // Extract from amenities (clean up the names)
  cabin.amenities.forEach(amenity => {
    const cleanName = amenity.name
      .replace(/Free /gi, '')
      .replace(/Fully Equipped /gi, '')
      .replace(/Smart /gi, '')
      .trim();
    keywords.add(cleanName);
  });

  // Extract key phrases from description
  const descriptionKeywords = [
    'Forest', 'Lake', 'Nature', 'Beach', 'Mountain', 'River', 'Stream',
    'Hiking', 'Cycling', 'Fishing', 'Swimming', 'Skiing',
    'Coffee', 'Terrace', 'Garden', 'View', 'Quiet', 'Peaceful',
    'Adventure', 'Relaxation', 'Getaway', 'Retreat'
  ];

  descriptionKeywords.forEach(keyword => {
    if (cabin.description.toLowerCase().includes(keyword.toLowerCase())) {
      keywords.add(keyword);
    }
  });

  // Extract location info
  if (cabin.location.city) {
    keywords.add(cabin.location.city.split(' ')[0]); // First word of city
  }

  // Convert to array and return (limit to reasonable number)
  return Array.from(keywords).slice(0, 20);
}
