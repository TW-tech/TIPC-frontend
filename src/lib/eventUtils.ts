// Event utility functions

export interface EventRaw {
  id: string;
  title: string;
  date: string;
  mainImage: string;
  description: string;
  subTitle: string;
  relatedImages: Array<{ id: number; title: string; src: string }>;
  type?: 'current' | 'past'; // Optional - will be determined by date if not provided
  alt: string;
}

export interface Event extends EventRaw {
  type: 'current' | 'past'; // Required after processing
}

/**
 * Checks if an event date has passed and automatically updates the type
 * @param event - The event object to check
 * @returns Updated event with correct type based on date
 */
export function updateEventType(event: Event): Event {
  // Parse the event date
  let eventDate: Date;
  
  if (event.date.includes('~')) {
    // Handle date ranges like "2025-03-15 ~ 2025-04-01" by taking the end date
    const endDateStr = event.date.split('~')[1].trim();
    eventDate = new Date(endDateStr);
  } else {
    // Handle single date like "2025-08-16"
    eventDate = new Date(event.date);
  }
  
  // Get current date (set to start of day for accurate comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Set event date to start of day for accurate comparison
  eventDate.setHours(0, 0, 0, 0);
  
  // If event date has passed (is before today), mark as past
  if (eventDate < today) {
    return {
      ...event,
      type: 'past'
    };
  }
  
  // Otherwise, keep as current (includes today and future dates)
  return {
    ...event,
    type: 'current'
  };
}

/**
 * Process all events and update their types based on dates
 * @param events - Array of events to process
 * @returns Array of events with updated types
 */
export function processEvents(events: Event[]): Event[] {
  return events.map(event => updateEventType(event));
}
