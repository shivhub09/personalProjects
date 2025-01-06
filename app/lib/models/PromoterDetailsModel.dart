class PromoterDetails {
  final String id;
  final String name;
  final String email;
  final List<String> formIds;

  PromoterDetails({
    required this.id,
    required this.name,
    required this.email,
    required this.formIds,
  });

  factory PromoterDetails.fromJson(Map<String, dynamic> json) {
    return PromoterDetails(
      id: json['_id'] ?? '',
      name: json['promoterName'] ?? '',
      email: json['promoterEmailId'] ?? '',
      formIds: List<String>.from(json['forms'] ?? []),
    );
  }
}