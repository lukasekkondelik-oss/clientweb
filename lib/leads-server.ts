/**
 * Server-only pomocná vrstva pro odesílání leadů na budoucí webhook (n8n →
 * Raynet). V prototypu není žádný reálný webhook nastaven – pokud env
 * proměnná chybí, lead se pouze zaloguje jako "přijatý", aby šlo API
 * bez úprav napojit na ostrý webhook později.
 *
 * Nikdy nečte žádný Raynet API klíč – ten zůstává výhradně na straně n8n/
 * Raynetu, nikdy v tomto webu.
 */
export async function forwardLead(webhookUrl: string | undefined, payload: unknown, label: string) {
  if (!webhookUrl) {
    console.info(`[leads] ${label}: webhook URL není nastavena, lead zůstává pouze zalogovaný.`, payload);
    return { forwarded: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return { forwarded: response.ok };
  } catch (error) {
    console.error(`[leads] ${label}: odeslání na webhook selhalo`, error);
    return { forwarded: false };
  }
}

const submissionLog = new Map<string, number[]>();

/** Jednoduchá ochrana proti spamu – omezí počet odeslání ze stejné IP v krátkém čase. */
export function isRateLimited(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > limit;
}
