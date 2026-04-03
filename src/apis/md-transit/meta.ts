/**
 * Maryland MTA Transit module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "md-transit",
  displayName: "Maryland MTA (Transit & MARC Train)",
  category: "State & Local",
  description:
    "Maryland Transit Administration (MTA) data. Provides GTFS static feed URLs for schedule data " +
    "(Local Bus, Light Rail, Metro Subway, MARC Train, Commuter Bus), plus real-time service alerts. " +
    "MARC train real-time trip updates and vehicle positions are available as public protobuf feeds. " +
    "Swiftly API key (free) required for real-time bus/rail data.",
  auth: {
    envVar: "SWIFTLY_API_KEY",
    signup: "https://www.mta.maryland.gov/developer-resources",
  },
  workflow:
    "md_transit_feeds for GTFS feed URLs → md_transit_alerts for active service alerts → " +
    "md_transit_marc_status for MARC train real-time status.",
  tips:
    "GTFS static feeds are ZIP archives containing schedule CSVs — use the feed URLs to download and parse. " +
    "Service alerts are available without authentication. " +
    "MARC train real-time data (trip updates, vehicle positions) is available as protobuf at public S3 URLs. " +
    "For bus/rail real-time, a Swiftly API key is required (free, request via Google Form on MTA developer page). " +
    "Swiftly agency keys: mta-maryland, mta-maryland-light-rail, mta-maryland-metro, mta-maryland-commuter-bus.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "md_transit_feeds, md_transit_alerts (Maryland public transit schedules and service alerts)" },
    { question: "state-level", route: "md_transit_feeds, md_transit_alerts (Maryland transit system data)" },
  ],
  reference: {
    docs: {
      "MTA Developer Resources": "https://www.mta.maryland.gov/developer-resources",
      "Swiftly API": "https://swiftly-inc.stoplight.io/docs/realtime-standalone/",
    },
    gtfsFeeds: {
      localBus: "https://feeds.mta.maryland.gov/gtfs/local-bus",
      lightRail: "https://feeds.mta.maryland.gov/gtfs/light-rail",
      metro: "https://feeds.mta.maryland.gov/gtfs/metro",
      marc: "https://feeds.mta.maryland.gov/gtfs/marc",
      commuterBus: "https://feeds.mta.maryland.gov/gtfs/commuter-bus",
    },
    realtimeFeeds: {
      marcTripUpdates: "https://mdotmta-gtfs-rt.s3.amazonaws.com/MARC+RT/marc-tu.pb",
      marcVehiclePositions: "https://mdotmta-gtfs-rt.s3.amazonaws.com/MARC+RT/marc-vp.pb",
      serviceAlerts: "https://feeds.mta.maryland.gov/alerts.pb",
    },
  },
} satisfies ModuleMeta;
