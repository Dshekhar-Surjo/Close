import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || ''
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Location helpers ──────────────────────────────────────────────────────────

/**
 * Upsert this user's live location into the `locations` table.
 * Requires a `locations` table in Supabase with columns:
 *   user_id (text, PK), lat (float8), lng (float8), updated_at (timestamptz)
 */
export async function upsertLocation(userId, lat, lng) {
  return supabase.from('locations').upsert({
    user_id:    userId,
    lat,
    lng,
    updated_at: new Date().toISOString(),
  })
}

/**
 * Subscribe to real-time location changes for nearby users.
 * Returns the Supabase Realtime channel — call .unsubscribe() on cleanup.
 */
export function subscribeToLocations(onUpdate) {
  return supabase
    .channel('locations')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'locations' }, onUpdate)
    .subscribe()
}

// ── Message helpers ───────────────────────────────────────────────────────────

/**
 * Send a message between two users.
 * Requires a `messages` table with columns:
 *   id, from_id, to_id, text, created_at
 */
export async function sendMessage(fromId, toId, text) {
  return supabase.from('messages').insert({
    from_id:    fromId,
    to_id:      toId,
    text,
    created_at: new Date().toISOString(),
  })
}

/**
 * Subscribe to messages sent to this user in real time.
 */
export function subscribeToMessages(userId, onMessage) {
  return supabase
    .channel(`messages:${userId}`)
    .on('postgres_changes', {
      event:  'INSERT',
      schema: 'public',
      table:  'messages',
      filter: `to_id=eq.${userId}`,
    }, onMessage)
    .subscribe()
}
