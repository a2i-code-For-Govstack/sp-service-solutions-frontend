# Databricks notebook source
# MAGIC %run /Users/gajendra.kumar@getsimpl.com/Includes/utilities

# COMMAND ----------

# MAGIC %run /Users/gajendra.kumar@getsimpl.com/Includes/secret_variables

# COMMAND ----------

import pandas as pd
import pytz    
import numpy as np 
from datetime import datetime, timedelta, timezone
from pyspark.sql.types import StructType,StructField, StringType, LongType, DecimalType, TimestampNTZType, TimestampType
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.functions import *
from pyspark.sql.functions import lit, expr, to_timestamp
import boto3
import builtins
import s3fs

Logger = spark._jvm.org.apache.log4j.Logger
mylogger = Logger.getLogger(__name__)
spark = SparkSession.builder.appName("Db_rds_snapshot_tables_report").getOrCreate()

# Constants
DATE_FORMAT = '%Y_%m_%d'
BUCKET_ID_FORMAT = 'date_%Y_%m_%d'
bucket = 'adhoc-query-data'
s3_path = 'suraj.verma/db_job_rds_snapshot_tables_details/'

# constants for parquet file saving location 
bucket_name_parquet = 'adhoc-query-data'
base_path_parquet = 'suraj.verma/gauravTest/saveDfData'
# {key is name_of_table.schema.subtable
   # value is path }
config = {  
    'api.public.adjustments': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.adjustments',
    'api.public.cycles': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.cycles',
    'api.public.credit_limits': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.credit_limits',
    'api.public.disputes': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.disputes',
    'api.public.fines': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.fines',
    'api.public.gateway_merchant_links': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.gateway_merchant_links',
    'api.public.gateways': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.gateways',
    'api.public.issuers': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.issuers',
    'api.public.issuer_merchant_configurations': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.issuer_merchant_configurations',
    'api.public.merchant_configurations': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.merchant_configurations',
    'api.public.merchant_credit_limits': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.merchant_credit_limits',
    'api.public.merchants': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.merchants',
    'api.public.merchant_users': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.merchant_users',
    'api.public.one_time_settlements': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.one_time_settlements',
    'api.public.personal_profiles': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.personal_profiles',
    'api.public.products': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.products',
    # 'api.public.repayment_issuer_details': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.repayment_issuer_details',
    'api.public.settlements': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.settlements',
    'api.public.split_pay_installment_payments': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.split_pay_installment_payments',
    'api.public.split_pay_installments': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.split_pay_installments',
    'api.public.split_pay_transaction_refunds': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.split_pay_transaction_refunds',
    'api.public.split_pay_transactions': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.split_pay_transactions',
    'api.public.sub_merchants': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.sub_merchants',
    'api.public.transaction_data': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transaction_data',
    'api.public.transaction_extras': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transaction_extras',
    'api.public.transaction_refunds': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transaction_refunds',
    'api.public.transactions': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transactions',
    'api.public.user_configurations': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.user_configurations',
    'api.public.users': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.users',
    'api.public.transfers': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transfers',
    'api.public.transfer_splits': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transfer_splits',
    'api.public.user_eligibility_profiles': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.user_eligibility_profiles',
    'api.public.cycles_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.cycles_timestamp_adjusted',
    # 'api.public.fines_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.fines_timestamp_adjusted',
    # 'api.public.one_time_settlements_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.one_time_settlements_timestamp_adjusted',
    # 'api.public.settlements_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.settlements_timestamp_adjusted',
    # 'api.public.split_pay_transactions_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.split_pay_transactions_timestamp_adjusted',
    'api.public.transactions_timestamp_adjusted': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.transactions_timestamp_adjusted',
    'api.public.access_tokens': f's3://output-de/api_db_s3_snapshot_to_redshift/api_db_snapshot/simpl_api_production/public.access_tokens',

    'billbox_production.public.whitelists': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.whitelists',
    'billbox_production.public.upcoming_bills': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.upcoming_bills',
    'billbox_production.public.bills': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.bills',
    'billbox_production.public.linked_billers': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.linked_billers',
    'billbox_production.public.billbox_experiments': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.billbox_experiments',
    'billbox_production.public.billbox_cashbacks': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.billbox_cashbacks',
    'billbox_production.public.billbox_transactions': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.billbox_transactions',
    'billbox_production.public.billers': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.billers',
    'billbox_production.public.paas_transactions': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.paas_transactions',
    'billbox_production.public.users': f's3://output-de/billbox_db_s3_snapshot_to_redshift_dag/billbox_snapshot/billbox_production/public.users',

    'cashback.public.cashbacks': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.cashbacks',
    'cashback.public.cashback_campaigns': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.cashback_campaigns',
    'cashback.public.split_pay_cashbacks': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.split_pay_cashbacks',
    'cashback.public.campaign_target_items': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.campaign_target_items',
    'cashback.public.campaign_target_groups': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.campaign_target_groups',
    'cashback.public.campaign_targeted_merchant_metadata': f's3://output-de/cashback_db_s3_snapshot_to_redshift_dag/cashback_snapshot/cashback_engine_production/public.campaign_targeted_merchant_metadata',

    # 'checkout_3pp_production.public.woocommerce_app_configs': f's3://output-de/checkout_3pp_DB_s3_snapshot_to_redshift/checkout_3pp_snapshot/checkout_3pp_production/public.woocommerce_app_configs'

    'checkout_api.public.abandoned_carts': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.abandoned_carts',
    'checkout_api.public.auth_tokens': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.auth_tokens',
    'checkout_api.public.button_templates': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.button_templates',
    'checkout_api.public.merchant_theme_configs': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.merchant_theme_configs',
    'checkout_api.public.orders': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.orders',
    'checkout_api.public.users': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.users',
    'checkout_api.public.payments': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.payments',
    # 'checkout_api.public.recon_audits': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.recon_audits',
    'checkout_api.public.payment_order_xref': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.payment_order_xref',
    'checkout_api.public.payment_order_refund_xref': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.payment_order_refund_xref',
    'checkout_api.public.merchant_checkout_configs': f's3://output-de/checkout_api_db_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_api_production/public.merchant_checkout_configs',

    'checkout.public.orders': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.orders',
    # 'checkout.public.order_line_items': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.order_line_items',
    'checkout.public.order_payments': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.order_payments',
    'checkout.public.order_fulfillments': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.order_fulfillments',
    'checkout.public.payments': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.payments',
    'checkout.public.refunds': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.refunds',
    'checkout.public.discount_campaign_merchant_mappings': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.discount_campaign_merchant_mappings',
    'checkout.public.discount_campaigns': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.discount_campaigns',
    'checkout.public.oms_refund_attempts': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.oms_refund_attempts',
    'checkout.public.oms_refunds': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.oms_refunds',
    'checkout.public.refund_attempts': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.refund_attempts',
    'checkout.public.payment_orders': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.payment_orders',
    'checkout.public.shipping_lines': f's3://output-de/checkout_db_s3_snapshot_to_redshift/checkout_snapshot/checkout_gateway_production/public.shipping_lines',

    'checkout_toss_production.public.coupons': f's3://output-de/checkout_toss_DB_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_toss_production/public.coupons',
    # 'checkout_toss_production.public.events': f's3://output-de/checkout_toss_DB_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_toss_production/public.events',
    # 'checkout_toss_production.public.merchant_coupon_statuses': f's3://output-de/checkout_toss_DB_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_toss_production/public.merchant_coupon_statuses',
    'checkout_toss_production.public.shopify_coupon_additional_details': f's3://output-de/checkout_toss_DB_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_toss_production/public.shopify_coupon_additional_details',
    'checkout_toss_production.public.coupon_conditions': f's3://output-de/checkout_toss_DB_s3_snapshot_to_redshift/checkout_api_snapshot/checkout_toss_production/public.coupon_conditions',

    # 'cod_db.public.addresses_v2': f'DE Prod: s3://output-de-deprod/cod_db_s3_snapshot_to_redshift_dag/cod_service_db_tables_snapshot/cod_db/public.addresses_v2',
    # 'cod_db.public.merchants': f'DE Prod: s3://output-de-deprod/cod_db_s3_snapshot_to_redshift_dag/cod_service_db_tables_snapshot/cod_db/public.merchants',

    # 'shipment_tracking_service.public.delivery_partner_slug_mappings': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.delivery_partner_slug_mappings',
    # 'shipment_tracking_service.public.delivery_partners': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.delivery_partners',
    # 'shipment_tracking_service.public.oms_delivery_partners': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.oms_delivery_partners',
    # 'shipment_tracking_service.public.shipment_statuses': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.shipment_statuses',
    'shipment_tracking_service.public.shipments': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.shipments',
    'shipment_tracking_service.public.tracking_provider_shipments': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.tracking_provider_shipments',
    # 'shipment_tracking_service.public.tracking_providers': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.tracking_providers',
    'shipment_tracking_service.public.tracking_status_mappings': f'DE Prod: s3://output-de-deprod/shipment_ts_db_s3_snapshot_to_redshift_dag/shipment_ts_db_tables_snapshot/shipment_ts/public.tracking_status_mappings',

    'fingerprint_production.public.visits': f's3://output-de/fingerprint_db_s3_snapshot_to_redshift_dag/fingerprint_prod_snapshot/fingerprint_production/public.visits',

    'issue_service.public.categories': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.categories',
    'issue_service.public.disputes': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.disputes',
    'issue_service.public.events': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.events',
    'issue_service.public.issues': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.issues',
    'issue_service.public.issue_types': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.issue_types',
    'issue_service.public.merchant_issue_types': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.merchant_issue_types',
    'issue_service.public.waive_fine_requests': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.waive_fine_requests',
    'issue_service.public.issue_reports': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.issue_reports',
    'issue_service.public.transactions': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.transactions',
    'issue_service.public.tracked_events': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.tracked_events',
    'issue_service.public.resolution_transactions': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.resolution_transactions',
    'issue_service.public.merchant_issue_configurations': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.merchant_issue_configurations',
    'issue_service.public.comments': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.comments',
    'issue_service.public.orders': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.orders',
    'issue_service.public.items': f's3://output-de/issue_service_db_s3_snapshot_to_redshift_dag/issue_service_snapshot/issue_service/public.items',

    'simpl_merchant_payments.public.categories': f's3://output-de/merchant_payments_db_s3_snapshot_to_redshift_dag/merchant_payments_snapshot/simpl-merchant-payments/public.categories',
    'simpl_merchant_payments.public.transaction_fees': f's3://output-de/merchant_payments_db_s3_snapshot_to_redshift_dag/merchant_payments_snapshot/simpl-merchant-payments/public.transaction_fees',
    'simpl_merchant_payments.public.merchant_details': f's3://output-de/merchant_payments_db_s3_snapshot_to_redshift_dag/merchant_payments_snapshot/simpl-merchant-payments/public.merchant_details',
    'simpl_merchant_payments.public.subcategories': f's3://output-de/merchant_payments_db_s3_snapshot_to_redshift_dag/merchant_payments_snapshot/simpl-merchant-payments/public.subcategories',
    
    'merchant_payouts.public.deductions_configurations': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.deductions_configurations',
    'merchant_payouts.public.fees_configurations': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.fees_configurations',
    'merchant_payouts.public.fees_gst_configurations': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.fees_gst_configurations',
    'merchant_payouts.public.parties': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.parties',
    'merchant_payouts.public.payout_adjustments': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_adjustments',
    'merchant_payouts.public.payout_deductions': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_deductions',
    'merchant_payouts.public.payout_fees': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_fees',
    'merchant_payouts.public.payout_fees_gsts': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_fees_gsts',
    'merchant_payouts.public.payout_ledger': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_ledger',
    'merchant_payouts.public.payout_tachyon_orders': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.payout_tachyon_orders',
    'merchant_payouts.public.settlements': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/merchant_payouts_snapshot/merchant_payouts_production/public.settlements',
    'merchant_payouts.public.payout_tachyon_orders_flatten': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/unload_merchant_payouts_production.payout_tachyon_orders/',
    'merchant_payouts.public.payout_ledger_flatten': f's3://output-de/merchant_payouts_db_s3_snapshot_to_redshift_dag/unload_merchant_payouts_production.payout_ledger/',

    'oms_support_production.public.orders':f's3://output-de/oms_support_db_s3_snapshot_to_redshift_dag/oms_support_snapshot/oms_support_production/public.orders',
     
    'users_service.public.addresses': f's3://output-de/users_service_db_s3_snapshot_to_redshift/users_service_db_snapshot/users_service_production/public.addresses',
    'users_service.public.identifiers': f's3://output-de/users_service_db_s3_snapshot_to_redshift/users_service_db_snapshot/users_service_production/public.identifiers',
    'users_service.public.identities': f's3://output-de/users_service_db_s3_snapshot_to_redshift/users_service_db_snapshot/users_service_production/public.identities',

    # 'shopify_backend_production.public.custom_app_configs': f's3://output-de/shopify_backend_production_db_s3_snapshot_to_redshift_dag/shopify_backend_snapshot/shopify_backend_production/public.custom_app_configs',
    # 'shopify_backend_production.public.backend_jobs': f's3://output-de/shopify_backend_production_db_s3_snapshot_to_redshift_dag/shopify_backend_snapshot/shopify_backend_production/public.backend_jobs',
    # 'shopify_backend_production.public.shopify_gift_cards': f's3://output-de/shopify_backend_production_db_s3_snapshot_to_redshift_dag/shopify_backend_snapshot/shopify_backend_production/public.shopify_gift_cards',
    # 'shopify_backend_production.public.shopify_shops': f's3://output-de/shopify_backend_production_db_s3_snapshot_to_redshift_dag/shopify_backend_snapshot/shopify_backend_production/public.shopify_shops',
   
   'simpl_communication_dashboard.public.blocking_events': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.blocking_events',
    'simpl_communication_dashboard.public.cashbacks': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.cashbacks',
    # 'simpl_communication_dashboard.public.chat_bot_messages': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.chat_bot_messages',
    'simpl_communication_dashboard.public.merchants': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.merchants',
    'simpl_communication_dashboard.public.partial_repayment_links': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.partial_repayment_links',
    'simpl_communication_dashboard.public.users': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.users',
    'simpl_communication_dashboard.public.reminder_schedules': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.reminder_schedules',
    'simpl_communication_dashboard.public.reminder_campaigns': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.reminder_campaigns',
    'simpl_communication_dashboard.public.calendars': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.calendars',
    'simpl_communication_dashboard.public.transaction_reviews': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.transaction_reviews',
    'simpl_communication_dashboard.public.tags': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.tags',
    # 'simpl_communication_dashboard.public.user_tags': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.user_tags',
    'simpl_communication_dashboard.public.simpl_users': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.simpl_users',
    'simpl_communication_dashboard.public.credit_updates': f's3://output-de/communication_dashboard_db_s3_snapshot_to_redshift_dag/communication_dashboard_snapshot/simpl_communication_dashboard/public.credit_updates',
    }
  

def utils_get_execution_date(epoch_time):
    timezone = pytz.timezone('Asia/Calcutta')
    # ist_date = datetime.fromtimestamp(epoch_time, tz=timezone).date() - timedelta(days=1)
    ist_date = datetime.fromtimestamp(epoch_time, tz=timezone) - timedelta(days=0)
    return ist_date

  
def get_last_modified_time(bucket_name, folder_prefix):
    s3_client = boto3.client('s3')
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=folder_prefix)
    if 'Contents' in response:
        latest_object = builtins.max(response['Contents'], key=lambda obj: obj['LastModified'])
        last_modified_time = latest_object['LastModified']
        updated_time = last_modified_time + timedelta(hours=5, minutes = 30)
        return updated_time
    return None 

def transform_string(schema, input_str):
    return f"{schema}.{input_str}"
def databricks_rds_tables_report():
    job_execution_time = int(dbutils.widgets.get("job_execution_time"))
    execution_date = utils_get_execution_date(job_execution_time//1000)
    mylogger.info(f"Job started to publish report on details of snapshot tables for execution date : {execution_date.strftime(DATE_FORMAT)}")
    ########### TEST ######################################
    # execution_date = datetime.now()-timedelta(days=0)
    ####################################################  

    curr_base_date = datetime.combine(execution_date.date(), datetime.min.time()) + timedelta(days=0) # we get in IST from databricks trigger job
    curr_date = execution_date.strftime(DATE_FORMAT)
    mylogger.info(f"Running job to generate report on snapshot tables data on: {curr_date}")

    ## Note: To view tables in a db: SHOW TABLES FROM SCHEMA simpl_structured_data_production.api;

    schema = StructType([
    StructField('table', StringType(), True),
    StructField('count', LongType(), True) ,
    StructField('last_updated', TimestampType(), True),
    StructField('delay_hours', LongType(), True),
    StructField('s3_latest_file', TimestampType(), True),  # New column
    StructField('s3_delay_hours', LongType(), True), # New column
    StructField('files_path', StringType(), True),
    StructField('bucket_id', StringType(), True) #New Column
    ])
  
    schema_email = StructType([
    StructField('table', StringType(), True),
    StructField('count', LongType(), True) ,
    StructField('last_updated',TimestampType(), True),
    StructField('delay_hours', LongType(), True),
    StructField('s3_latest_file', TimestampType(), True),  # New column
    StructField('s3_delay_hours', LongType(), True), # New column
    StructField('files_path', StringType(), True),
    ])

    result = spark.createDataFrame([],schema)
    result_email = spark.createDataFrame([],schema_email)

    # combined_tables_list = ['simpl_communication_dashboard.users', 'oms_support_production.orders', 'api.gateways', 'simpl_merchant_payments.merchant_details', 'merchant_payouts.payout_adjustments'] ## for testing 

    table_count = 0
    
    for key, value in config.items():
        
        table_count = table_count+1
        # Extract sub_table from the key
        parts = key.split('.')
        # api_db_table_list.public.adjustments
        schema_table = parts[1]
        input_str = '.'.join(parts[3:])
        sub_table = transform_string(schema_table, input_str)
        
        # print(sub_table)
        query = f"select '{sub_table}' as table, count(*) as count, \
            max(updated_at + interval 5 hours + interval 30 minutes) as last_updated, \
            CAST(FLOOR(DATEDIFF(MINUTE, last_updated, '{curr_base_date}') / 60) AS INT) AS delay_hours \
            from {sub_table};"

        df = spark.sql(query).fillna(0)
        value_parts = value.split('/', 3)
        path = value
        bucket_here = value_parts[2]
        prefix_path = value_parts[3]
        last_updated_time_resource = get_last_modified_time(bucket_here, prefix_path)
        
        df = df.withColumn("s3_latest_file", to_timestamp(lit(last_updated_time_resource)))
        df = df.withColumn("s3_delay_hours",lit(expr(f"CAST(FLOOR(DATEDIFF(MINUTE, s3_latest_file, '{curr_base_date}') / 60) AS INT)")))
        df = df.withColumn("files_path", lit(path))
        result_email = result_email.union(df)
        df = df.withColumn("bucket_id",lit(datetime.now().date()))
        result = result.union(df)

    final_df = result.toPandas()
    final_df_email = result_email.toPandas()
    mylogger.info(f"Total tables in the ecosystem: {table_count}")
    ## processing in pandas
    # final_df = result.toPandas()
    # final_df['delay_hours'] = np.floor(final_df['delay_hours']).astype(int)
    # final_df = final_df.sort_values(by=['delay_hours'], ascending=False) # Note when using inplace=True, we must not save it in a df, it will throw error. It should run as a single line of code without storing in a separate df 

    mylogger.info(f"Fetched the df data metrics from relevant tables")
    path = s3_path
    path = path + f'{curr_date}/'
    # saving as csv not required so commenting out the command 
    # save_df_to_csv_folder(bucket, path, final_df_email)  
    # mylogger.info(f"Saved df as CSV file in s3 bucket {bucket} and path: {path}")
    send_email_report(final_df_email, curr_date)
    save_df_to_parquet_folder(final_df , bucket_name_parquet , base_path_parquet)
  
#  logic first delete the previous file and then create a new parquet file logic ( currently not needed so commenting out  )
def save_df_to_parquet_folder(final_df , bucket_name , base_path):
    DELAY_HOURS = 24 
    LONG_DELAY_HOURS = 720 # 1 month    
    final_df['s3_delay_hours'] = final_df['s3_delay_hours'].apply(lambda x: 0 if x <= 0 else x)
    final_df['delay_hours'] = final_df['delay_hours'].apply(lambda x: 0 if x <= 0 else x)

    delayed_hr_df = final_df[(final_df['delay_hours']>DELAY_HOURS) & (final_df['delay_hours']<LONG_DELAY_HOURS)]
    delayed_hr_df = delayed_hr_df.sort_values(by='delay_hours', ascending=False)

    long_delayed_df = final_df[final_df['delay_hours']>=LONG_DELAY_HOURS]
    long_delayed_df = long_delayed_df.sort_values(by='delay_hours', ascending=False)

    intime_df = final_df[final_df['delay_hours']<=DELAY_HOURS]
    intime_df = intime_df.sort_values(by='table', ascending=True)

    final_df = pd.concat([long_delayed_df, delayed_hr_df, intime_df], axis=0)

    bucket_id_format = 'date_%Y_%m_%d'
    current_date_str = datetime.now().date().strftime(bucket_id_format)
    s3_folder_path_here = f'{base_path}/bucket_id={current_date_str}/'
    s3_path_here = f's3://{bucket_name}/{s3_folder_path_here}'
    s3_client = boto3.client('s3')

    # Checkning folder exists
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=s3_folder_path_here)
    if 'Contents' in response:
        # Folder exists, so delete it
        for obj in response['Contents']:
            s3_client.delete_object(Bucket=bucket_name, Key=obj['Key'])
        print(f"Deleted existing folder: {s3_folder_path_here}")
      
    parque_filename_path = f'{s3_path_here}'+'data.parquet'
    # Save the DataFrame in parquet format
    final_df.to_parquet(parque_filename_path, engine='pyarrow')
    print(f"Data saved to {parque_filename_path}")
  
def send_email_report(final_df, curr_date):

    to_emails = ['data-engineering@getsimpl.com']
    ##### TEST ###################################
    # to_emails = ['suraj.verma@getsimpl.com']
    #################################################
    DELAY_HOURS = 24 
    LONG_DELAY_HOURS = 720 # 1 month    
    final_df['s3_delay_hours'] = final_df['s3_delay_hours'].apply(lambda x: 0 if x <= 0 else x)
    final_df['delay_hours'] = final_df['delay_hours'].apply(lambda x: 0 if x <= 0 else x)

    delayed_hr_df = final_df[(final_df['delay_hours']>DELAY_HOURS) & (final_df['delay_hours']<LONG_DELAY_HOURS)]
    delayed_hr_df = delayed_hr_df.sort_values(by='delay_hours', ascending=False)

    long_delayed_df = final_df[final_df['delay_hours']>=LONG_DELAY_HOURS]
    long_delayed_df = long_delayed_df.sort_values(by='delay_hours', ascending=False)

    intime_df = final_df[final_df['delay_hours']<=DELAY_HOURS]
    intime_df = intime_df.sort_values(by='table', ascending=True)

    final_df = pd.concat([long_delayed_df, delayed_hr_df, intime_df], axis=0)
  
    table_to_email = final_df.to_html(classes='mystyle', index=False).replace("text-align: right;", "text-align: center;")
    for tname in long_delayed_df["table"]:
        table_to_email = table_to_email.replace(
            "<td>" + tname, "<td bgcolor=\"red\">" + tname)
    
    for tname in delayed_hr_df["table"]:
        table_to_email = table_to_email.replace(
            "<td>" + tname, "<td bgcolor=\"#ff958d\">" + tname)
        
    sender = get_config['PRODUCTION_EMAIL_REPORTS']
    report_name = "Data Platform | Databricks RDS Snapshot Tables Count Report | " + str(curr_date)
    subject = "{}".format(report_name)

    total_intime_tables = len(intime_df)
    total_delay_load_tables = len(delayed_hr_df)
    total_long_delay_load_tables = len(long_delayed_df)

    html = f"""\
        <html>
        <head>
        <style type="text/css">
            .mystyle {{
            font-size: 11pt;
            font-family: Arial;
            border-collapse: collapse;
            border: 2px solid black;
        }}
        .mystyle th {{
            background-color: #00ffae;
        }}
        .mystyle td, th {{
            padding: 5px;
        }}
        .mystyle tr:nth-child(even) {{
            background: #E0E0E0;
        }}
        .mystyle tr:hover {{
            background: silver;
            cursor: pointer;
        }}
        </style>
        </head>
        <body>
        <p>Hi team, </p>
        <p>Report Date : {curr_date}</p>
        <p>Report also stored as parquet here S3>Buckets>adhoc-query-data>suraj.verma/>gauravTest/>saveDfData/>bucket_id={curr_date}/</p>
        <p>Please refer today's report on RDS Snapshot tables in Databricks. </p>

        <ul> 
  <li>Number of tables loaded on time (<b>within 24Hrs</b>): {total_intime_tables}</li>
  <li>Number of tables loaded with small delay (<b>more than 24Hrs and less than 720Hrs</b>, highlighted in light red): {total_delay_load_tables}</li>
  <li>Number of tables <b>not regularly refreshed</b> or have high delay (<b>more than 720Hrs </b>, highlighted in red): {total_long_delay_load_tables}</li>
</ul>
        {table_to_email}
        <p>Regards</p>  
    </body>
    </html>
    """

    email = EmailToSend(to=to_emails, sender=sender, subject=subject, body=html)
    email.add_df_as_csv(final_df, 'result.csv')
    res = email.send()
    mylogger.info(f"Email sent")

if __name__ == '__main__':
    databricks_rds_tables_report()

# COMMAND ----------

# from datetime import datetime
# # import datetime
# execution_date = datetime.now()-timedelta(days=0)
# curr_base_date = datetime.combine(execution_date, datetime.min.time()) + timedelta(days=0)
# print(curr_base_date)
# execution_date = datetime.now()-timedelta(days=0)
# print(execution_date)

# COMMAND ----------



# COMMAND ----------

